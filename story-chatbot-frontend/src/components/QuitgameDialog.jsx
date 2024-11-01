import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    theme,
    ThemeProvider,
    useDisclosure
  } from "@chakra-ui/react";
  import React, { useEffect, useRef } from "react";
  import ReactDOM from "react-dom/client";

  let returnResponse;

  const AlertRoot = (props) => {
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
          <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
          >
            <AlertDialogOverlay />

            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">{title}</AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>{message}</AlertDialogBody>
              <AlertDialogFooter>
                <Button variant="ghost" ref={cancelRef} onClick={cancel}>
                  {cancelText ?? 'Close'}
                </Button>
                <Button ml={3} onClick={confirm} colorScheme="red">
                  {okText ?? 'Continue'}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </ThemeProvider>
      </>
    );
  };

  // pass in alert type
  function Create(props) {
    const rootID = "temp";
    let div = document.getElementById(rootID);

    if (!div) {
      div = document.createElement("div");
      div.id = rootID;
      document.body.appendChild(div);
    }

    const root = ReactDOM.createRoot(div);
    root.render(<AlertRoot {...props} />);

    if (div) {
      div.remove();
    }
  }

  export function Confirm(props) {
    Create(props);

    return new Promise(resolve => {
      returnResponse = resolve;
    });
  }
