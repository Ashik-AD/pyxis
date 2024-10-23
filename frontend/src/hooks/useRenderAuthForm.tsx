import { AuthForm } from "../components/auth-form";
import Modal from "../components/modal/Modal";
import useToggle from "./useToggle";

export default function useRenderAuthForm(show?: boolean) {
  let { toggle, handleToggle } = useToggle(show);
  function Form() {
    if (!toggle) return null;
    return (
      <Modal handleClick={handleToggle}>
        <AuthForm />
      </Modal>
    );
  }

  return { AuthFormHook: Form, showForm: handleToggle } as const;
}
