package cardeal.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cardeal.entities.Admin;

@Repository
public interface AdminDao extends JpaRepository<Admin, String> {

}
