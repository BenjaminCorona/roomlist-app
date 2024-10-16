import PocketBase from 'pocketbase';

const pb = new PocketBase('https://roomlist.pockethost.io');

function getCurrentTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}Z`;
}

export async function logRoomEntry(userinfo, roomId) {
    try {
        const salaResult = await pb.collection('Salas').getFirstListItem(`Codigo_Sala="${roomId}"`);
        if (!salaResult) {
            console.error('No se encontró la sala con el código proporcionado');
            return;
        }
        const salaId = salaResult.id;

        const existingRecords = await pb.collection('Usuario_Tablero').getList(1, 1, {
            filter: `ID_Usuario.id = "${userinfo.id}" && ID_Sala.Codigo_Sala = "${roomId}"`,
        });

        if (existingRecords.totalItems > 0) {
            console.log('Ya existe un registro para este usuario y sala');
            return;
        }

        const usuarioTableroRecord = await pb.collection('Usuario_Tablero').create({
            ID_Usuario: userinfo.id,
            ID_Sala: salaId,
        });
        console.log("Record1");
        console.log(usuarioTableroRecord);


        const record = await pb.collection('Historial_Cambios').create({
            Fecha_Cambio: getCurrentTime(),
            Descripcion_Cambio: `${userinfo.username} se unió a la sala con código ${roomId}`,
            ID_Usuario: userinfo.id,
            ID_Sala: roomId,
        });
        console.log("Record2");
        console.log(record);
    } catch (error) {
        console.error('Error al manejar el registro de entrada a sala:', error);
    }
}

export async function logCardCreation(userinfo, cardName,) {
    try {
        const record = await pb.collection('Historial_Cambios').create({
            Fecha_Cambio: getCurrentTime(),
            Descripcion_Cambio: `${userinfo.username} creó la tarjeta con el nombre ${cardName}`,
            ID_Usuario: userinfo.id,
        });
        console.log('Registro de creación de tarjeta creado:', record);
    } catch (error) {
        console.error('Error al crear el registro de creación de tarjeta:', error);
    }
}