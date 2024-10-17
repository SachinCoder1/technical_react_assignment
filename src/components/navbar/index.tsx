import { Link, useNavigate } from "react-router-dom";
import { Button, Group, Container, Title, Header, Flex } from "@mantine/core";
import { useAuthStore } from "../../store/auth.store";

const Navbar: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Header height={60} sx={{ borderBottom: "1px solid #eaeaea", paddingTop: "10px" }}>
      <Container fluid>
        <Group position="apart">
          {/* Company Logo/Title */}
          <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
            <Title order={4}>ScriptAssist</Title>
          </Link>

          <Group position="right" spacing="md">
            {/* Show Login button if not authenticated */}
            {!isAuthenticated ? (
              <Button component={Link} to="/login">
                Login
              </Button>
            ) : (
              <>
                {/* Show Logout button if authenticated */}
                <Button component={Link} to="/person">
                  Main
                </Button>
                <Button onClick={handleLogout} variant="default">
                  Logout
                </Button>
              </>
            )}
          </Group>
        </Group>
      </Container>
    </Header>
  );
};

export default Navbar;
