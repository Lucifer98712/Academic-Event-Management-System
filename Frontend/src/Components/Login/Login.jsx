import { useNavigate } from "react-router-dom";
import { Card, Button, Input, Form, message } from "antd";
import { loginUser } from "../../Utils/ClientApi";

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const passwordPattern = /^.{6,}$/;

  const formItems = [
    {
      name: "email",
      label: "Email",
      rules: [{ required: true, type: "email", message: "Please enter a valid email" }],
      component: <Input placeholder="Email" />,
    },
    {
      name: "password",
      label: "Password",
      rules: [
        { required: true, message: "Please enter your password" },
        { pattern: passwordPattern, message: "Password must be at least 6 characters." },
      ],
      component: <Input.Password placeholder="Input password" />,
    },
  ];

  const onFinish = async (values) => {
    try {
      const data = await loginUser(values);
      const { accessToken, message: msg, user } = data.data;
      const { role } = user;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      const isUser = role === "user";
      !isUser ? navigate("/dashboard") : navigate("/event");
      console.log(msg ?? "Login successful");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        title="Login"
        styles={{ header: { background: "#1574EF", color: "white" } }}
        style={{ width: "500px" }}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          {formItems.map((item) => (
            <Form.Item key={item.name} name={item.name} label={item.label} rules={item.rules}>
              {item.component}
            </Form.Item>
          ))}
          <Button type="primary" htmlType="submit" style={{ marginTop: "10px" }}>
            Login
          </Button>
        </Form>
        <p>
          Don't have an account?{" "}
          <Button type="link" onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
        </p>
      </Card>
    </div>
  );
};

export default Login;
