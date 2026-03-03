package com.scpm.inmemory.scpminmemory.userService.registrations.repos;

import com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals.Users;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class UserRepositoryImpl implements UserRepository{
    Map<Long, Users> userMap=new ConcurrentHashMap<>();


    @Override
    public void save(Users users) {
        userMap.put(users.getId(),users);
    }

    @Override
    public List<Users> findAll() {

    return new ArrayList<>(userMap.values());
    }

    @Override
    public Users findById(long id) {

        return userMap.get(id);
    }

    @Override
    public void delete(Users users) {
        if(userMap.containsKey(users.getId())){
        userMap.remove(users);
        }
    }

    @Override
    public void deleteById(long id) {
        for(Users users:userMap.values()){
            if(users.getId()==id){
                userMap.remove(users);
            }
        }
    }

    @Override
    public Optional<Users> findByEmail(String email) {
        for(Users users:userMap.values()) {
      if (users.getEmail().equals(email)) {
          return Optional.of(users);
      }
  }
        return Optional.empty();
    }
}
