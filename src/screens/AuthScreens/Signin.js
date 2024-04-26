import { useNavigation } from "@react-navigation/native";
import AuthForm from "../../components/Auth/AuthForm";
import { useDispatch } from "react-redux";
import { signin } from "../../store/features/authSlice";


const Signin = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()


    return (

        <AuthForm title={'Log In'}
            titleDescription='Please Sign in to continue'
            onTap={({ email, password }) => dispatch(signin({ email, password }))} />
    );
};


export default Signin;
