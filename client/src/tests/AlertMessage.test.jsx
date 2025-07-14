import AlertMessage from "../components/common/AlertMessage";
import { getByRole, render, screen } from "@testing-library/react";

describe("AlertMessage component", () => {
  it("¿No se renderiza si no se proporciona un mensaje?", () => {
    const { container } = render(<AlertMessage />);
    expect(container).toBeEmptyDOMElement();
  });

  it("¿Si el tipo es success renderiza el mensaje con la clase alert-success?", () => {
    render(<AlertMessage message="Reserva creada con éxito." type="success" />);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("alert-success");
  });

  it("¿Si el tipo no es success renderiza el mensaje con la clase alert-danger?", () => {
    render(<AlertMessage message="Error en el servidor." type="error" />);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("alert-danger");
  });

  it("¿Se renderiza con el mensaje correcto?", () => {
    render(<AlertMessage message="Reserva creada con éxito." type="success" />);
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Reserva creada con éxito."
    );
  });
});
