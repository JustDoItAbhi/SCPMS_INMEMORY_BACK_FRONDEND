package com.scpm.inmemory.scpminmemory.userService.subjects.servie;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.Subjects;
import com.scpm.inmemory.scpminmemory.userService.registrations.exceptions.UserExceptions;
import com.scpm.inmemory.scpminmemory.userService.registrations.repos.subject_repo.SubjectRepository;
import com.scpm.inmemory.scpminmemory.userService.subjects.dtos.SubjectRequestDto;
import com.scpm.inmemory.scpminmemory.userService.subjects.dtos.SubjectResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.*;

@Service
public class SubjectServiceImpl implements SubjectService{
@Autowired
    private SubjectRepository subjectRepository;

    @Override
    public SubjectResponseDto addSubjectByYear(SubjectRequestDto dto) {
        Optional<Subjects>subjects=subjectRepository.findBySubject(dto.getSubjct());
        if(subjects.isPresent()){
            throw new UserExceptions(" SUCH SUBJECT ALREADY AVAILABLE RIGHT NOW FOR YEAR "+dto.getCourseYear());
        }
        Subjects sub=new Subjects();
        sub.setCourseYear(dto.getCourseYear());
        sub.setSubject(dto.getSubjct());
        subjectRepository.save(sub);
        return fromEntity(sub);
    }

    @Override
    public SubjectResponseDto getSubhectByYear(String Year) {
        System.out.println("YOU ARE IN GET SUBJECT BY YEAR METHOD IMPL SERVICE "+Year);
        List<Subjects>subjectListYear=subjectRepository.findByCourseYear(Year);

        if(subjectListYear.isEmpty()){
            throw new UserExceptions("PLEASE ENTER VALID YEAR "+Year);
        }
        SubjectResponseDto dto=new SubjectResponseDto();
        dto.setCourseYear(Year);

        List<String>subjectName=new ArrayList<>();
        for(Subjects s:subjectListYear){
            subjectName.add(s.getSubject());
        }
        dto.setSubjectsList(subjectName);
        return dto;
    }

    @Override
    public SubjectResponseDto updateSubject(long id,SubjectRequestDto dto) {
        Optional<Subjects>subjects=subjectRepository.findById(id);
        if(subjects.isEmpty()){
            throw new UserExceptions("INVALID SUBJECT "+ id);
        }
        Subjects subject=subjects.get();
        subject.setSubject(dto.getSubjct());
        subject.setCourseYear(dto.getCourseYear());
        subjectRepository.save(subject);
        return fromEntity(subject);
    }

    @Override
    public List<SubjectResponseDto> transferAllListOfStubjecsFromCsvFile(MultipartFile file) throws IOException {
        List<SubjectResponseDto>responseDtos=new ArrayList<>();
        try (Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            CSVReader csvReader = new CSVReader(reader);
            List<String[]> records = csvReader.readAll();

            if (records.isEmpty()) {
                throw new UserExceptions("Unable to read data from CSV file");
            }

            // Skip header row if it exists
            int startIndex = 0;
            if (records.get(0)[0].equals("created_at") || records.get(0)[0].matches(".*[a-zA-Z].*")) {
                startIndex = 1; // Skip header row
            }

            for (int i = startIndex; i < records.size(); i++) {
                String[] row = records.get(i);

                // Debug: Print the row to see what data you're getting
                System.out.println("Processing row: " + String.join(", ", row));

                // Based on your sample data, adjust indices accordingly
                // Your sample: "1 56:56.2 56:56.2 1st LATIN LANGUAGE & MEDICAL TERMINOLOGY"
                if (row.length >= 5) {
                    Subjects subjects = new Subjects();
                    subjects.setCourseYear(row[3].trim()); // "1st"
                    subjects.setSubject(row[4].trim()); // "LATIN LANGUAGE & MEDICAL TERMINOLOGY"

                    subjectRepository.save(subjects);
                    responseDtos.add(fromEntity(subjects));
                } else {
                    System.err.println("Skipping row " + i + ": insufficient columns. Found: " + row.length);
                }
            }

        } catch (CsvException e) {

            throw new RuntimeException(e);
        }
        return responseDtos;
    }

    @Override
    public List<SubjectResponseDto> getAllSubjects() {
        List<Subjects>subjects=subjectRepository.findAll();
        List<SubjectResponseDto>responseDtos=new ArrayList<>();
        for(Subjects subjects1:subjects){
            responseDtos.add(fromEntity(subjects1));
        }
        return responseDtos;
    }

    @Override
    public String addSubjectsInmemory() {
        // Create a map of course year to list of subjects
        Map<String, List<String>> subjectsByYear = new HashMap<>();
        if(!subjectsByYear.isEmpty()){
            return "old record of subjects loaded";
        }

        // 1st Year Subjects
        subjectsByYear.put("1st", Arrays.asList(
                "LATIN LANGUAGE & MEDICAL TERMINOLOGY",
                "HISTORY OF MEDICINE",
                "FUNDAMENTALS OF PSYCHOLOGY AND FUNDAMENTALS OF PEDAGOGICS",
                "MEDICAL BIOLOGY",
                "MEDICAL CHEMISTRY",
                "HUMAN ANATOMY",
                "HISTOLOGY, CYTOLOGY & EMBRYOLOGY",
                "MEDICAL & BIOLOGICAL PHYSICS",
                "POLITOLOGY (POLITICAL SCIENCE)"
        ));

        // 2nd Year Subjects
        subjectsByYear.put("2nd", Arrays.asList(
                "BIOCHEMISTRY (BIOLOGICAL & BIO-ORGANIC CHEMISTRY)",
                "NORMAL PHYSIOLOGY",
                "MICROBIOLOGY, VIROLOGY & IMMUNOLOGY",
                "CLINICAL ANATOMY AND OPERATIVE SURGERY",
                "HYGIENE AND ECOLOGY",
                "MEDICAL INFORMATICS"
        ));

        // 3rd Year Subjects
        subjectsByYear.put("3rd", Arrays.asList(
                "BASICS OF PSYCHOLOGY & PEDAGOGICS",
                "SOCIAL MEDICINE & ORGANISATION OF HEALTH PROTECTION SERVICES",
                "PATHOLOGICAL ANATOMY",
                "PHARMACOLOGY AND MEDICAL DISPENSING OF MEDICINE",
                "PATHOLOGICAL PHYSIOLOGY",
                "PROPAEDEUTICS OF CHILDREN'S DISEASES WITH THE CARE OF CHILDREN",
                "RADIODIAGNOSTICS AND RADIOTHERAPY",
                "GENERAL SURGERY WITH ANESTHESIOLOGY AND PATIENT CARE",
                "TOPOGRAPHIC ANATOMY",
                "OPERATIVE SURGERY",
                "PROPAEDEUTICS OF INTERNAL DISEASES WITH THE CARE OF PATIENTS",
                "GENERAL HYGIENE"
        ));

        // 4th Year Subjects
        subjectsByYear.put("4th", Arrays.asList(
                "OBSTETRICS AND GYNECOLOGY",
                "REMEDIAL GYMNASTICS AND SPORTS MEDICINE",
                "DERMATOVENEROLOGY (SKIN & VENEREAL DISEASES)",
                "PSYCHIATRY, NARCOLOGY AND MEDICAL PSYCHOLOGY",
                "NERVOUS DISEASES (NEUROLOGY)",
                "FACULTY PEDIATRICS WITH MEDICAL GENETICS",
                "RADIATIVE (RADIATION) MEDICINE",
                "PHTHISIOLOGY (TUBERCULOSIS DISEASES)",
                "ENDOCRINOLOGY",
                "FACULTY SURGERY (SURGICAL DISCIPLINES FOR THE FACULTY)",
                "FACULTATIVE THERAPY WITH PHYSIOTHERAPY",
                "ECONOMICS OF HEALTH PROTECTION"
        ));

        // 5th Year Subjects
        subjectsByYear.put("5th", Arrays.asList(
                "OPHTHALMOLOGY",
                "ENT (EAR, NOSE & THROAT)",
                "OCCUPATIONAL DISEASES",
                "TRAUMATOLOGY AND ORTHOPAEDICS",
                "HOSPITAL PODIATRY",
                "GYNAECOLOGY",
                "HOSPITAL SURGERY",
                "NEUROSURGERY",
                "PAEDIATRIC SURGERY",
                "INFECTIOUS & TROPICAL DISEASES",
                "EPIDEMIOLOGY & MILITARY EPIDEMIOLOGY",
                "CHILDREN'S INFECTIOUS DISEASES",
                "ONCOLOGY",
                "URGENT STATES / MEDICINE OF CATASTROPHES",
                "FORENSIC MEDICINE",
                "BASICS OF LAW",
                "MILITARY FIELD SURGERY"
        ));

        // 6th Year Subjects
        subjectsByYear.put("6th", Arrays.asList(
                "HYGIENE",
                "SOCIAL MEDICINE & ORGANISATION OF HEALTH PROTECTION SERVICES FOR 6TH YEAR",
                "ECONOMICS OF HEALTH PROTECTION 6TH YEAR",
                "INTERNAL MEDICINE",
                "INFECTIOUS DISEASES",
                "TROPICAL DISEASES",
                "PEDIATRICS",
                "ONCOLOGY 6TH YEAR",
                "CLINICAL PHARMACOLOGY",
                "CHILDREN'S INFECTIOUS DISEASES 6TH YEAR",
                "OBSTETRICS & GYNECOLOGY",
                "PAEDIATRIC SURGERY 6TH YEAR",
                "RHEUMATOLOGY (INTENSIVE CARE)",
                "SURGICAL DISEASES",
                "CLINICAL IMMUNOLOGY & ALLERGOLOGY",
                "NEUROSURGERY 6TH YEAR",
                "THERAPY"
        ));

        // Save all subjects to the repository
        for (Map.Entry<String, List<String>> entry : subjectsByYear.entrySet()) {
            String courseYear = entry.getKey();
            for (String subjectName : entry.getValue()) {
                Subjects subject = new Subjects();
                subject.setSubject(subjectName);
                subject.setCourseYear(courseYear); // Assuming Subjects entity has a courseYear field
                System.out.println("SUBJECTS "+subject.getSubject()+"  👍👍");
                subjectRepository.save(subject);
            }
        }

        return "SAVED ALL SUBJECTS IN MEMORY";
    }


    private SubjectResponseDto fromEntity(Subjects subjects){
        SubjectResponseDto dto=new SubjectResponseDto();
        dto.setCourseYear(subjects.getCourseYear());
        List<String >subjectName=new ArrayList<>();
        subjectName.add(subjects.getSubject());
        dto.setSubjectsList(subjectName);
    return dto;
    }
// CREATE AN API WHERE STUDENT WILL SELECT THE SUBJECT WITH YEAR , AND  STUDENT ID
// AND FIND TEACHER AND THEN SELECT TEACHER AND THEN WRITE HIS THOUGHTS ABOUT CONFERENCE



}
