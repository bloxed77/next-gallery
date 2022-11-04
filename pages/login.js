import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState } from "react";
import {
    Layout,
    Loading,
    LoginForm,
    Message,
    RegisterForm,
} from "../components";
import { useAuth } from "../context";
import { useFetch } from "../hooks";

export const getServerSideProps = async (context) => {
    return {
        props: {
            data: null,
        },
    };
};

export default function Loginpage({}) {
    const [isRegister, setIsRegister] = useState(false);
    const router = useRouter();
    const { isLoading, msg, handleRegister, handleLogin } = useFetch();
    const { user } = useAuth();
    return (
        <Layout className={"items-center"} title={"Login"}>
            <div className="absolute shadow-cd rounded max-w-xs lg:max-w-2xl 2xl:max-w-4xl w-max h-max m-auto bg-slate-100 p-6 xl:p-6 2xl:p-16">
                {isRegister ? (
                    <RegisterForm
                        onFinish={async (d) => {
                            if (await handleRegister(d)) router.replace("/");
                        }}
                    />
                ) : (
                    <LoginForm
                        onFinish={async (d) => {
                            if (await handleLogin(d)) router.replace("/");
                        }}
                    />
                )}
                {isRegister ? (
                    <button
                        className="font-bold text-lg"
                        onClick={() => {
                            setIsRegister(false);
                        }}
                    >
                        Already have an account? Log in
                    </button>
                ) : (
                    <button
                        className="font-bold text-lg"
                        onClick={() => {
                            setIsRegister(true);
                        }}
                    >
                        Don't have an account? Register now!
                    </button>
                )}
                <Loading isLoading={isLoading} />
                <Message icon options={msg} />
                {/* <div
                    className="flex px-4 pt-4 justify-evenly "
                >
                    <FontAwesomeIcon
                        icon={faGoogle}
                        className="text-red-600 cursor-pointer"
                        size="2x"
                        onClick={() => {
                            router.push("/api/v1/auth/google");
                        }}
                    />
                    <FontAwesomeIcon
                        icon={faFacebookF}
                        className="text-blue-600 cursor-pointer"
                        size="2x"
                        onClick={() => {
                            router.push("/api/v1/auth/facebook");
                        }}
                    />
                </div> */}
            </div>
        </Layout>
    );
}
