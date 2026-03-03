package com.scpm.inmemory.scpminmemory.userService.students;


import com.scpm.inmemory.scpminmemory.userService.registrations.entities.modals_student.Students;
import com.scpm.inmemory.scpminmemory.userService.students.stDto.StudentsResponseDto;

public class StudentsMapper {
    public static StudentsResponseDto fromStudents(Students students){
        StudentsResponseDto dto=new StudentsResponseDto();
        dto.setUsers(students.getUser());
        dto.setStudentId(students.getId());
        dto.setCurrentYear(students.getCurrentYear());
        dto.setStudentIdCardNumber(students.getStudentIdCardNumber());
        dto.setGroupNumber(students.getGroupNumber());
        dto.setMonitorName(students.getMonitorName());
        dto.setPassportNumber(students.getPassportNumber());
        dto.setSubGroupNumber(students.getSubGroupNumber());
        return dto;
    }
}
