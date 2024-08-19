import { useSelector } from 'react-redux';

// Custom hook to get user data
const UserData = () => {
    const teacherLoggedIn = useSelector(state => state.teacher.logged);
    const studentLoggedIn = useSelector(state => state.student.logged);

    const teacherData = useSelector(state => state.teacher.teacherData);
    const studentData = useSelector(state => state.student.studentData);

    if (teacherLoggedIn) {
        return { isLoggedIn: true, type: 'teacher', data: teacherData };
    } else if (studentLoggedIn) {
        return { isLoggedIn: true, type: 'student', data: studentData };
    } else {
        return { isLoggedIn: false, type: 'none', data: null };
    }
};

export default UserData;
