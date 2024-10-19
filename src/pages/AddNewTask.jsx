import { useEffect, useState } from 'react';
import { Lock, CalendarIcon, PlusIcon, Target, CheckCircle2, Trash2, X } from 'lucide-react';
import PocketBase from "pocketbase";
import {logCardCreation, logRoomEntry} from '../tools/triggers_history.js';

const pb = new PocketBase('https://roomlist.pockethost.io');

export default function AddNewTask({toggle, codigoSala, updateTarjetas}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({name:false, description:false});
  const [tags, setTags] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUsuarios, setSelectedUsuarios] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [salaID, setSalaID] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const getSalaId = async (codigoSala) => {
    try {
      const sala = await pb.collection('Salas').getFirstListItem(`Codigo_Sala="${codigoSala}"`,{ requestKey: null }, {
        fields: 'id',
      });
      setSalaID(sala.id);
    } catch (err) {
      console.error('Error al obtener el ID de la sala:', err);
    }
  };

  useEffect(() => {
    if (codigoSala) {
      getSalaId(codigoSala);
    }
  }, [codigoSala]);

  //Función para cargar los usuarios de la sala
  const loadUsuarios = async () => {
    const usuariosTablero = await pb.collection('Usuario_Tablero').getFullList({
      filter: `ID_Sala.Codigo_Sala = "${codigoSala}"`}, { requestKey: null });
    if(usuariosTablero.length === 0){
      console.error('Error al cargar los usuarios');
      return
    }
    const idsUsuarios = usuariosTablero.map(item => item.ID_Usuario);
    const usuariosData = await Promise.all(
        idsUsuarios.map(async (id) => {
          const user = await pb.collection('Usuarios').getOne(id,{ requestKey: null });
          return user.username;
        })
    );
    setUsuarios(usuariosData);
  };
  //Cargar los usuarios en el compoente select
  useEffect(() => {
    if (codigoSala) {
      loadUsuarios();
    }
  }, [codigoSala]);

  useEffect(() => {
    // Get the current authenticated user
    const user = pb.authStore.model;
    setCurrentUser(user);
  }, []);

  const handleBlur = (field) => {
    if (field === 'name' && !name.trim()) {
        setErrors((prev) => ({...prev, name: true}));
    }else if (field === 'description' && !description.trim()) {
        setErrors((prev) => ({...prev, description: true}));
    }};

  const handleChange = (e) => {
    const {name, value } = e.target;
    if (name === 'name') {
      setName(value);
      setErrors((prev) => ({ ...prev, name: !value.trim() }));
    } else if (name === 'description') {
      setDescription(value);
      setErrors((prev) => ({ ...prev, description: !value.trim()}));
    }};

  const handleTagsChange = (e) => {
    setTagsInput(e.target.value);
  };

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }};

  const addTag = () => {
    if (tagsInput.trim()) {
      setTags(prevTags => {
        const newTag = tagsInput.trim();
        return prevTags ? `${prevTags},${newTag}` : newTag;
      });
      setTagsInput('');
    }};

  const handleUsuarioChange = (e) => {
    const selectedUser = e.target.value;
    if (!selectedUsuarios.includes(selectedUser)) {
      setSelectedUsuarios((prev) => [...prev, selectedUser]);
      setUsuarios((prev) => prev.filter(user => user !== selectedUser));
      e.target.value = '';
    }
  };

  const removeUsuario = (username) => {
    setSelectedUsuarios((prev) => prev.filter(user => user !== username));
    setUsuarios((prev) => [...prev, username]);
  };

  const handleSave = async () => {
    if (!name.trim() || !description.trim()) {
      setErrors((prev) => ({
        name: !name.trim(),
        description: !description.trim(),
      }));
      return;
    }
    try {
      // Get the full user objects for selected users
      const userObjects = await Promise.all(
          selectedUsuarios.map(async (username) => {
            const user = await pb.collection('Usuarios').getFirstListItem(`username="${username}"`, { requestKey: null });
            return user;
          })
      );
      const userIds = userObjects.map(user => user.id);

      const newTaskData = {
          Titulo: name,
          Descripcion: description,
          Fecha_Inicio: `${startDate} 00:00:00`,
          Fecha_Terminado: `${endDate} 00:00:00`,
          Estatus: true,
          Progreso: "Por Hacer",
          Etiqueta: tags,
          ID_Usuario: userIds ? userIds : null,
          ID_Sala: salaID,
          ID_Creador: currentUser.id,
        };

      const record = await pb.collection('Tarjetas').create(newTaskData);

      await logCardCreation(currentUser, name, codigoSala);
      toggle();
      updateTarjetas();
    } catch (err) {
      console.error("Error saving task:", err);
      console.error("Error details:", err.data);
    }
  };

  return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70">
        <div className="relative w-full max-w-lg max-h-screen bg-white p-6 rounded-lg shadow-lg overflow-y-auto">
          <div className="bg-white z-10 flex justify-between items-center p-2">
            <div className="flex items-center text-sm text-gray-500">
              <h2 className="text-2xl font-bold mb-6 text-center">Agregar tarea</h2>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={toggle} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="h-4 w-4 mb-3 text-gray-600"/>
              </button>
            </div>
          </div>

          {/*Campo nombre*/}
          <div className="mb-2">
            <h3 className="font-semibold mb-2">Nombre</h3>
            <input
                type="text"
                name="name"
                placeholder="Nombre de la tarea"
                value={name}
                onChange={handleChange}
                onBlur={() => handleBlur('name')}
                className={`w-full p-2 mb-1 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded`}
            />
            {errors.name && <p className="text-red-500 text-sm">El nombre de la tarea es obligatorio</p>}
          </div>

          {/*Campo descripción tarea*/}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Descripción</h3>
            <textarea
                name="description"
                placeholder="Descripción de la tarea"
                value={description}
                onChange={handleChange}
                onBlur={() => handleBlur('description')}
                className={`w-full p-2 mb-1 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded min-h-[100px] resize-y`}
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm">La descripción es obligatoria</p>}
          </div>

          {/*Campo fecha de inicio*/}
          <div className="flex space-x-2 mb-4">
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Fecha de inicio</h3>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarIcon className="h-5 w-5 text-gray-400"/>
                </div>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/*Campo fecha de fin*/}
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Fecha de fin</h3>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarIcon className="h-5 w-5 text-gray-400"/>
                </div>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/*Campo de etiquetas*/}
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Etiquetas</h3>
              <div className="flex rounded-md shadow-sm">
                <input
                    type="text"
                    placeholder="Agregar etiqueta"
                    value={tagsInput}
                    onChange={handleTagsChange}
                    onKeyPress={handleTagKeyPress}
                    className="block w-full py-2 px-3 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button
                    onClick={addTag}
                    className="bg-gray-600 text-white px-4 py-2 rounded-r-md hover:bg-gray-800 focus:outline-none">
                  +
                </button>
              </div>
              {tags && (
                  <div className="mt-2">
                    <p className="italic text-gray-400 ml-1">{tags}</p>
                  </div>
              )}
            </div>
          </div>

          {/* Usuarios */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Usuarios</h3>
              <select
                  onChange = {handleUsuarioChange}
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white">
                <option value="" disabled selected hidden>Selecciona usuario</option>
                {usuarios.map((username, index) => (
                    <option key={index} value={username}>{username}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-12">
            {selectedUsuarios.map((username, index) => (
                <div key={index} className="flex items-center justify-between py-2 px-3 mb-2 border border-gray-300 rounded sm:text-sm bg-gray-200">
                  <span>{username}</span>
                  <button onClick={() => removeUsuario(username)} className="text-gray-600 hover:text-gray-800">
                    <X className="h-4 w-4"/>
                  </button>
                </div>
            ))}
          </div>

          <div className="bg-white">
            <button
                onClick={handleSave}
                className="px-6 py-3 bg-gray-600 text-white w-full rounded-md hover:bg-gray-800">
              Guardar tarea
            </button>
          </div>
        </div>
      </div>
  );
}
