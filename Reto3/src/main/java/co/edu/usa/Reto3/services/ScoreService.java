/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.edu.usa.Reto3.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import co.edu.usa.Reto3.models.Score;
import co.edu.usa.Reto3.repositories.ScoreRepository;
import co.edu.usa.Reto3.repositories.crud.ScoreCrudRepository;
import java.util.Optional;

/**
 *
 * @author Alexander Arango
 */
@Service
public class ScoreService {

    @Autowired
    private ScoreRepository reposScore;

    // CRUD Create, Read, Update, Delete
    // Create
    public Score saveScore(Score score) {
        Score scoreNew = reposScore.save(score);
        return getScoreById(scoreNew.getId());
    }

    //Read
    public List<Score> getAll() {
        return reposScore.getAll();
    }

    //Update
    public Score updateScore(Score score) {        
        if (score.getId() != null){
            Optional<Score> scoreConsultada = reposScore.getById(score.getId());
            if (scoreConsultada.isPresent()){
                
                scoreConsultada.get().setScore(score.getScore());
                
                return reposScore.save(scoreConsultada.get());
            }
        }
        return score;
    }

    //Delete
    public boolean deleteScore(int id) {
        boolean del = reposScore.getById(id).map(score -> {
            reposScore.delete(score);
            return true;
        }).orElse(false);
        return del;
    }

    //Filtro por ID
    public Score getScoreById(int id) {
        Optional<Score> score = reposScore.getById(id);
        return score.orElse(new Score());
    }
}
