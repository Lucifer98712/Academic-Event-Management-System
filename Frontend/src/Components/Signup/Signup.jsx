import { useNavigate } from "react-router-dom";
import { Card, Button, Input, DatePicker, Form, message } from "antd";
import { registerUser } from "../../Utils/ClientApi";

const Signup = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const passwordPattern = /^.{6,}$/;

  const formItems = [
    {
      name: "name",
      label: "Full Name",
      rules: [{ required: true, message: "Please enter your name" }],
      placeholder: "Name",
      component: <Input placeholder="Name" />,
    },
    {
      name: "email",
      label: "Email",
      rules: [
        {
          required: true,
          type: "email",
          message: "Please enter a valid email",
        },
      ],
      placeholder: "Email",
      component: <Input placeholder="Email" />,
    },
    {
      name: "contact",
      label: "Phone Number",
      rules: [{ required: true, message: "Please enter your phone number" }],
      placeholder: "+977 ********",
      component: <Input placeholder="+977 ********" />,
    },
    {
      name: "dateOfBirth",
      label: "Date of Birth",
      rules: [{ required: true, message: "Please select your date of birth" }],
      component: <DatePicker style={{ width: "100%" }} />,
    },
    {
      name: "password",
      label: "Password",
      rules: [
        { required: true, message: "Please enter your password" },
        {
          pattern: passwordPattern,
          message: "Password must be at least 6 characters.",
        },
      ],
      component: <Input.Password placeholder="Input password" />,
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      rules: [
        { required: true, message: "Please confirm your password" },
        {
          pattern: passwordPattern,
          message: "Password must be at least 6 characters",
        },
      ],
      component: <Input.Password placeholder="Confirm password" />,
    },
  ];

  const onFinish = async (values) => {
    try {
      await registerUser(values);
      message.success("Registration successful, please login to continue.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      message.error("Registration failed. Please try again.");
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
        title="Signup"
        styles={{ header: { background: "#1574EF", color: "white" } }}
        style={{ width: "500px" }}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          {formItems.map((item) => (
            <Form.Item
              key={item.name}
              name={item.name}
              label={item.label}
              rules={item.rules}
            >
              {item.component}
            </Form.Item>
          ))}
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: "10px" }}
          >
            Signup
          </Button>
        </Form>
        <p>
          Your account exists?
          <Button type="link" onClick={() => navigate("/login")}>
            Login
          </Button>
        </p>
      </Card>
    </div>
  );
};

export default Signup;
