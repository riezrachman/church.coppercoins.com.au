class RegisterController {
    const [stepIndex, setStepIndex] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [obscurePassword, setObscurePassword] = useState(true);

    const [loading, setLoading] = useState(false);
    const [validation, setValidation] = useState([]);

    const navigate = useNavigate();
};
