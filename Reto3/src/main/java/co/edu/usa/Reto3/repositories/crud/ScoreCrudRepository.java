/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.Reto3.repositories.crud;

import co.edu.usa.Reto3.models.Score;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author Alexander Arango
 */
public interface ScoreCrudRepository extends CrudRepository<Score, Integer>{
    
}
