import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../components/common/Button";

// Grupo de pruebas
describe("Button component", () => {
  it("se renderiza con el texto correcto", () => {
    //Se monta el componente
    render(<Button name="Reservar ahora" />);
    //Busca el botón en pantalla y verifica el contenido del texto
    expect(screen.getByRole("button")).toHaveTextContent("Reservar ahora");
  });
});
