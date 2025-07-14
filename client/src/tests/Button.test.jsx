import { render, screen, fireEvent, getByRole } from "@testing-library/react";
import Button from "../components/common/Button";

// Grupo de pruebas
describe("Button component", () => {
  it("¿Se renderiza con el texto correcto?", () => {
    //Se monta el componente
    render(<Button name="Reservar ahora" />);
    //Busca el botón en pantalla y verifica el contenido del texto
    expect(screen.getByRole("button")).toHaveTextContent("Reservar ahora");
  });

  it("¿La propiedad onClick funciona bien?", () => {
    const mockOnClick = vi.fn();
    render(<Button name="Hacer click." onClick={mockOnClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("¿Aplica bien las clases?", () => {
    render(
      <Button
        name="Clases"
        btnCustom="solid-btn-tertiary"
        btnText="label-small"
        paddingBtn="p-3"
      />
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("btn");
    expect(button).toHaveClass("solid-btn-tertiary");
    expect(button).toHaveClass("label-small");
    expect(button).toHaveClass("p-3");
  });
});
