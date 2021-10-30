/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.Reto3.repositories;

import co.edu.usa.Reto3.models.Reservation;
import co.edu.usa.Reto3.repositories.crud.ReservationCrudRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Alexander Arango
 */
@Repository
public class ReservationRepository {
    
    @Autowired
    private ReservationCrudRepository repo;
    
    public List<Reservation> getAll() {
        return (List<Reservation>) repo.findAll();
    }
    
    public Reservation save(Reservation reservation) {
        return repo.save(reservation);
    }
    
    public Optional<Reservation> getById(int id) {
        return repo.findById(id);
    }
    
    public String deleteById(int id){
        repo.deleteById(id);
        return "Registro con id " + id + " ha sido eliminado"; 
    }
    
    public void delete(Reservation reservation){
        repo.delete(reservation);
    }
}
