package com.scpm.inmemory.scpminmemory.userService.registrations.repos.student_topic_repo;

import com.scpm.inmemory.scpminmemory.userService.registrations.entities.modals_student.StudentTopic;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.model_teachers.Teachers;
import com.scpm.inmemory.scpminmemory.userService.registrations.repos.teacher.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
@Repository
public class StudentTopicRepoImpl implements StudentTopicRepo {

    private final Map<Long, StudentTopic> studentTopicMap = new ConcurrentHashMap<>();
    @Autowired
    private TeacherRepository teacherRepository;

    @Override
    public void save(StudentTopic studentTopic) {
        if (studentTopic == null) {
            throw new IllegalArgumentException("StudentTopic cannot be null");
        }
        studentTopicMap.put(studentTopic.getId(), studentTopic);
    }

    @Override
    public Optional<StudentTopic> findById(long id) {
        StudentTopic studentTopic = studentTopicMap.get(id);
        if (studentTopic != null) {
            return Optional.of(studentTopic);
        }
        return Optional.empty();
    }

    @Override
    public List<StudentTopic> findAll() {
        if (studentTopicMap.isEmpty()) {
            return new ArrayList<>();
        }
        return new ArrayList<>(studentTopicMap.values());
    }

    @Override
    public void deleteById(long id) {
        studentTopicMap.remove(id);
    }

    @Override
    public List<StudentTopic> findByTeacherId(long teacherId) {
        List<StudentTopic> result = new ArrayList<>();

        for (StudentTopic topic : studentTopicMap.values()) {
            Optional<Teachers> teacher = teacherRepository.findById(topic.getTeacherId());

            if (teacher != null && teacher.get().getId() == teacherId) {
                result.add(topic);
            }
        }

        return result;
    }

    // Additional helper methods that might be useful

//    public List<StudentTopic> findByStudentId(long studentId) {
//        List<StudentTopic> result = new ArrayList<>();
//
//        for (StudentTopic topic : studentTopicMap.values()) {
//            Students student = topic.getStudentAndSubject().getStudents();
//            if (student != null && student.getId() == studentId) {
//                result.add(topic);
//            }
//        }
//
//        return result;
//    }

//    public Optional<StudentTopic> findByStudentIdAndTopicId(long studentId, long topicId) {
//        for (StudentTopic topic : studentTopicMap.values()) {
//            Students student = topic.getStudentAndSubject().getStudents();
//            Topic topicObj = topic.getTopic();
//
//            if (student != null && student.getId() == studentId
//                    && topicObj != null && topicObj.getId() == topicId) {
//                return Optional.of(topic);
//            }
//        }

//        return Optional.empty();
//    }

//    public List<StudentTopic> findByStatus(String status) {
//        List<StudentTopic> result = new ArrayList<>();
//
//        for (StudentTopic topic : studentTopicMap.values()) {
//            if (status.equals(topic.getStatus())) {
//                result.add(topic);
//            }
//        }
//
//        return result;
//    }

//    public List<StudentTopic> findByTeacherIdAndStatus(long teacherId, String status) {
//        List<StudentTopic> result = new ArrayList<>();
//
//        for (StudentTopic topic : studentTopicMap.values()) {
//            Teacher teacher = topic.getTeacher();
//            if (teacher != null && teacher.getId() == teacherId
//                    && status.equals(topic.getStatus())) {
//                result.add(topic);
//            }
//        }
//
//        return result;
//    }
//
//    public void updateStatus(long id, String newStatus) {
//        StudentTopic topic = studentTopicMap.get(id);
//        if (topic != null) {
//            topic.setStatus(newStatus);
//        }
//    }
//
//    public void deleteByStudentId(long studentId) {
//        // Find IDs to remove first to avoid ConcurrentModificationException
//        List<Long> idsToRemove = new ArrayList<>();
//
//        for (Map.Entry<Long, StudentTopic> entry : studentTopicMap.entrySet()) {
//            StudentTopic topic = entry.getValue();
//            Students student = topic.getStudent();
//
//            if (student != null && student.getId() == studentId) {
//                idsToRemove.add(entry.getKey());
//            }
//        }
//
//        // Remove after iteration
//        for (Long id : idsToRemove) {
//            studentTopicMap.remove(id);
//        }
//    }
//
//    public void deleteByTeacherId(long teacherId) {
//        // Find IDs to remove first to avoid ConcurrentModificationException
//        List<Long> idsToRemove = new ArrayList<>();
//
//        for (Map.Entry<Long, StudentTopic> entry : studentTopicMap.entrySet()) {
//            StudentTopic topic = entry.getValue();
//            Teacher teacher = topic.getTeacher();
//
//            if (teacher != null && teacher.getId() == teacherId) {
//                idsToRemove.add(entry.getKey());
//            }
//        }
//
//        // Remove after iteration
//        for (Long id : idsToRemove) {
//            studentTopicMap.remove(id);
//        }
//    }
//
//    public long countByTeacherId(long teacherId) {
//        int count = 0;
//
//        for (StudentTopic topic : studentTopicMap.values()) {
//            Teacher teacher = topic.getTeacher();
//            if (teacher != null && teacher.getId() == teacherId) {
//                count++;
//            }
//        }
//
//        return count;
//    }
//
//    public boolean existsByStudentIdAndTeacherId(long studentId, long teacherId) {
//        for (StudentTopic topic : studentTopicMap.values()) {
//            Students student = topic.getStudentAndSubject().getStudents();
//            Teachers teacher = topic.getTopic();
//
//            if (student != null && student.getId() == studentId
//                    && teacher != null && teacher.getId() == teacherId) {
//                return true;
//            }
//        }
//
//        return false;
//    }
//
//    // Helper method for testing
//    public void clearAll() {
//        studentTopicMap.clear();
//        idGenerator.set(1);
//    }
//
//    // Helper method to check size
//    public int size() {
//        return studentTopicMap.size();
//    }
//
//    // Helper method to check if empty
//    public boolean isEmpty() {
//        return studentTopicMap.isEmpty();
//    }
}