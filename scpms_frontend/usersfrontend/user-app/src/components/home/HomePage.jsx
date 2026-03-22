import { useEffect } from "react";
import "./HomeCss.css"
import { Link, useNavigate } from "react-router-dom"
function HomePage() {
    const navigate = useNavigate();
    localStorage.removeItem("access_token")
    localStorage.removeItem("studentId")
    localStorage.removeItem("subject")
    localStorage.removeItem("user")
    localStorage.removeItem("userId")
    localStorage.removeItem("teacher")
    localStorage.removeItem("studentAndSubjectId")
    localStorage.removeItem("teacherSubject")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("teacherId")
    localStorage.removeItem("id_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("roles");

    const handleClick = () => {
        navigate("/mylogin")
    }
    return (
        <div className="main-container">
      
            <div>
                <div className="topic">
                <video
                    className="mainVid"
                    src="/cup.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                ></video>
                <div className="video-overlay">
                       <button onClick={handleClick} className="buttonMenu">
                        MENU
                    </button>
                    <h1 className="scpms">
                        <span>S </span>
                        <span>C </span>
                        <span>P </span>
                        <span>M </span>
                        <span>S </span>
                        <br />
                        <span className="titles">Student Conference Participation Management System </span>    </h1>
                </div>
                    
                </div>

                <h2 className="objective">Overview</h2>
                <p>
                    The Student Conference Participation Management System (SCPMS) at Uzhhorod National University is an innovative digital platform developed to enhance academic engagement,
                    research culture, and student participation in national and international conferences. Situated in the heart of Uzhhorod, a city known for
                    its academic excellence and cultural diversity, the university has always emphasized research-driven education and active student involvement in scholarly activities.
                    This system reflects Uzhhorod National University’s
                    commitment to modernization and digital transformation in higher education.

                    The platform simplifies the entire process of managing student participation in conferences - from registration and submission of
                    research papers to approval, tracking, and certification. It serves as a centralized hub connecting students, faculty coordinators,
                    and event organizers, ensuring efficient communication and transparent management. By implementing SCPMS, Uzhhorod National University
                    continues to strengthen its role as a leading educational institution in Ukraine and Europe, promoting academic innovation and encouraging students to actively contribute to global research communities.
                </p>

                <video
                    className="videointro"
                    src="/hi.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                ></video>

                <ul>
                    <h2 className="objective">Objectives</h2>
                    <p>The primary objectives of the Student Conference Participation Management System are:</p>
                    <li>To streamline and digitalize the management of student participation in academic conferences, seminars, and workshops.</li>
                    <li>To promote research and innovation among students by providing an organized and accessible platform for academic engagement.</li>
                    <li>To enhance coordination between students, faculty, and administration, ensuring smooth communication and real-time updates on events.</li>
                    <li>To maintain a digital record of student achievements and participation for institutional reporting, accreditation, and recognition.</li>
                    <li>To reflect the university’s commitment to academic excellence, modernization, and global competitiveness by adopting smart digital solutions.</li>
                </ul>
                <video
                    className="videointro"
                    src="/v1.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                ></video>
                <br />
                <div>
                    <p>
                        Our Student Conference Participation Management System (SCPMS) makes conference participation effortless and rewarding. Students can easily submit topics,
                        track approvals, and receive instant notifications - all in one secure platform. Teachers can quickly review and approve submissions, ensuring a smooth workflow.
                        With transparent record-keeping and role-based access, SCPMS promotes fairness, accountability, and active academic engagement. By simplifying the entire process,
                        we help students focus on learning and presenting their ideas, making conference participation more organized, efficient, and impactful for everyone.
                    </p>

                </div>
            </div>
            <footer className="contacts">
                <div>
                    <Link to="/CONTACT-US" style={{ width: "100vw", color: "white" }}>CONTACT US</Link>
                    <p>
                        <strong>Address:</strong> 12 Universtistsks Street, City Uzhhorod, Country Uzhhorod
                    </p>
                    <p>
                        <strong>Phone:</strong> +1 234 567 890
                    </p>
                    <p>
                        <strong>Email:</strong> info@scpms.edu
                    </p>
                </div>
            </footer>
        </div>
    )
}
export default HomePage;