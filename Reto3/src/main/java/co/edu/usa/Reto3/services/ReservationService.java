/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.edu.usa.Reto3.services;

import co.edu.usa.Reto3.models.DTO.ContadorClientes;
import co.edu.usa.Reto3.models.DTO.StatusReservas;
import co.edu.usa.Reto3.models.Reservation;
import co.edu.usa.Reto3.repositories.ReservationRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import co.edu.usa.Reto3.repositories.crud.ReservationCrudRepository;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

/**
 *
 * @author Alexander Arango
 */
@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reposReservation;

    // CRUD Create, Read, Update, Delete
    // Create
    public Reservation saveReservation(Reservation reservation) {
        if(reservation.getStatus() == null) {
            reservation.setStatus("created");
        }        
        Reservation reservationNew = reposReservation.save(reservation);
        return getReservationById(reservationNew.getIdReservation());
    }

    //Read
    public List<Reservation> getAll() {
        return reposReservation.getAll();
    }

    //Update
    public Reservation updateReservation(Reservation reservation) {        
        if (reservation.getIdReservation()!= null){
            Optional<Reservation> reservationConsultada = reposReservation.getById(reservation.getIdReservation());
            if (reservationConsultada.isPresent()){
                
                reservationConsultada.get().setDevolutionDate(reservation.getDevolutionDate());
                reservationConsultada.get().setScore(reservation.getScore());
                reservationConsultada.get().setStartDate(reservation.getStartDate());
                reservationConsultada.get().setStatus(reservation.getStatus());
                reservationConsultada.get().setQuadbike(reservation.getQuadbike());
                reservationConsultada.get().setClient(reservation.getClient());
                
                return reposReservation.save(reservationConsultada.get());
            }
        }
        return reservation;
    }

    //Delete
    public boolean deleteReservation(int id) {
        boolean del = reposReservation.getById(id).map(reservation -> {
            reposReservation.delete(reservation);
            return true;
        }).orElse(false);
        return del;
    }

    //Filtro por ID
    public Reservation getReservationById(int id) {
        Optional<Reservation> reservation = reposReservation.getById(id);
        return reservation.orElse(new Reservation());
    }
    
    public StatusReservas getReporteStatusReservaciones() {
        List<Reservation> completed = reposReservation.ReservacionStatus("completed");
        List<Reservation> cancelled = reposReservation.ReservacionStatus("cancelled");
        return new StatusReservas(completed.size(), cancelled.size());
    }
    
    public List<Reservation> getReportesTiempoReservaciones(String datoA, String datoB) {
        SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd");
        Date datoUno = new Date();
        Date datoDos = new Date();
        try {
            datoUno = parser.parse(datoA);
            datoDos = parser.parse(datoB);
        } catch (ParseException evt) {
            evt.printStackTrace();
        }
        if (datoUno.before(datoDos)) {
            return reposReservation.ReservacionTiempo(datoUno, datoDos);
        } else {
            return new ArrayList<>();
        }
    }
    
    public List<ContadorClientes> servicioTopClientes() {
        return reposReservation.getTopClientes();
    }
}
