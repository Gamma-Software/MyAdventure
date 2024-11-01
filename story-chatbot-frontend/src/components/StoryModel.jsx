
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Button,
    theme,
    ThemeProvider,
    useDisclosure
  } from "@chakra-ui/react";
  import React, { useEffect, useRef } from "react";
  import ReactDOM from "react-dom/client";

  let returnResponse;

  const ModalRoot = (props) => {
    const { title, message, cancelText, okText, onOk, onCancel } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);

    useEffect(() => {
      onOpen();
    }, [onOpen]);

    const confirm = () => {
      onOk();
      onClose();
    };

    const cancel = () => {
      onCancel();
      onClose();
    };

    return (
      <>
        <ThemeProvider theme={theme}>
            <Modal
                closeOnOverlayClick={true}
                isOpen={isOpen}
                onClose={onClose}
                leastDestructiveRef={cancelRef}
                motionPreset="slideInBottom"
                isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize="lg" fontWeight="bold">Story and Choices</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {message}
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" ref={cancelRef} onClick={cancel}>
                        {cancelText ?? 'Close'}
                        </Button>
                        <Button ml={3} onClick={confirm} colorScheme="red">
                        {okText ?? 'Continue'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </ThemeProvider>
      </>
    );
  };

  // pass in modal type
  function Create(props) {
    const rootID = "temp";
    let div = document.getElementById(rootID);

    if (!div) {
      div = document.createElement("div");
      div.id = rootID;
      document.body.appendChild(div);
    }

    const root = ReactDOM.createRoot(div);
    root.render(<ModalRoot {...props} />);

    if (div) {
      div.remove();
    }
  }

  export function DisplayStory(props) {
    Create(props);

    return new Promise(resolve => {
      returnResponse = resolve;
    });
  }


