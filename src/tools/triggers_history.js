import PocketBase from 'pocketbase';
import {useState} from "react";

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

async function getRoomId(roomCode) {
    try{
        const salaResult = await pb.collection('Salas').getFirstListItem(`Codigo_Sala="${roomCode}"`, {requestKey: null});
        if (!salaResult) {
            console.error('No se encontró la sala con el código proporcionado');
            return null;
        }
        console.log("")
        return salaResult.id;
    }catch(err){
        console.error('Error al obtener el ID de la sala:', err);
        return null;
    }
}

export async function logRoomEntry(userinfo, roomId) {
    try {
        // Verificar si ya existe un registro de entrada a la sala
        const existingRecords = await pb.collection('Usuario_Tablero').getList(1, 1, {
            filter: `ID_Usuario.id = "${userinfo.id}" && ID_Sala.Codigo_Sala = "${roomId}"`,
        });
        if (existingRecords.totalItems > 0) {
            console.log('Ya existe un registro para este usuario y sala');
            return;
        }

        // Recupera el ID de la sala
        const id_sala = await getRoomId(roomId);
        if(id_sala == null) {
            console.log("No se pudo recuerar el id de la sala")
            return;
        };

        // Crea el registro de entrada a la sala en Usuario_Tablero
        const usuarioTableroRecord = await pb.collection('Usuario_Tablero').create({
            ID_Usuario: userinfo.id,
            ID_Sala: id_sala,
        });
        console.log("Registro de usuario al tablero creado: ", usuarioTableroRecord);

        // Crea el registro de entrada a la sala en Historial_Cambios
        const record = await pb.collection('Historial_Cambios').create({
            Fecha_Cambio: getCurrentTime(),
            Descripcion_Cambio: `${userinfo.username} se unió a la sala`,
            ID_Sala: id_sala,
        });
        console.log("Registro de entrada a la sala creado:". record);

    } catch (error) {
        console.error('Error al manejar el registro de entrada a sala:', error);
    }
}

export async function logCardCreation(userinfo, cardName, roomId) {
    try {
        console.log("logCardCreation");
        //Recupera el ID de la sala con el código de la sala
        const id_sala = await getRoomId(roomId);
        if (!id_sala) {
            console.error('No se pudo recuperar el ID de la sala');
            return;
        }

        // Crea el registro de creación de tarjeta en Historial_Cambios
        const record = await pb.collection('Historial_Cambios').create({
            Fecha_Cambio: getCurrentTime(),
            Descripcion_Cambio: `${userinfo.username} creó la tarjeta con el nombre ${cardName}`,
            ID_Sala: id_sala,
        });
        console.log('Registro de creación de tarjeta creado:', record);

    } catch (error) {
        console.error('Error al crear el registro de creación de tarjeta:', error);
    }
}

export async function logCardStatus(userinfo, cardName, roomId, status) {
    try {
        //Recupera el ID de la sala con el código de la sala
        const id_sala = await getRoomId(roomId);
        if (!id_sala) {
            console.error('No se pudo recuperar el ID de la sala');
            return;
        }

        // Crea el registro de creación de tarjeta en Historial_Cambios
        const record = await pb.collection('Historial_Cambios').create({
            Fecha_Cambio: getCurrentTime(),
            Descripcion_Cambio: `${userinfo.username} movió la tarjeta ${cardName} a ${status}`,
            ID_Sala: id_sala,
        });
        console.log('Registro del cambio de estatus:', record);

    } catch (error) {
        console.error('Error al registrar log del estatus de tarjeta:', error);
    }
}