import { useNavigation } from "@react-navigation/native";
import AuthForm from "../../components/Auth/AuthForm";
import { useDispatch } from "react-redux";
import { signup } from "../../store/features/authSlice";


const Signin = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    return (

        <AuthForm
            title={'Sign Up'}
            titleDescription='Please Sign in to continue'
            onTap={({ email, password, username, confirmPassword }) => dispatch(signup({ email, password, username, confirmPassword }))}
        />

    );
};


export default Signin;
