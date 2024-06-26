/* eslint-disable react-hooks/exhaustive-deps */
import {  VStack, Input, Modal, ModalOverlay, ModalHeader, ModalBody, Button, ModalFooter, ModalContent, ModalCloseButton, useToast, Checkbox, Toast } from '@chakra-ui/react'
import { useState } from 'react';
import { BASE_URL } from '../constant';
import axios from 'axios';

type LogFormProps =
    {
        isOpen: boolean;
        onClose: () => void;
        setAuthorized: (e:boolean) => void;
    }

const LogAddForm = ({ isOpen, onClose, setAuthorized }: LogFormProps) => {

    const toast = useToast();

    //zmienne reprezentuj¹ce u¿ytkownika
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [rememberMe, setRememberMe] = useState<boolean>(false);

    const [error, setError] = useState<string>("");

    //próba zalogowania u¿ytkownika po klikniêciu "zaloguj"

    const onSubmit = () => {
        if (!user.email || !user.password) {
            setError("Prosze wypelnic wszystkie pola.");
        }
        else {
            setError("");
            var loginUrl = "";
            if (rememberMe) {
                loginUrl = "login?useCookies=true";
            } else {
                loginUrl = "login?useSessionCookies=true";
            }

            axios.post(BASE_URL + loginUrl, user).then((res => {
                console.log(res.data);
                if (res.status == 200) {
                    toast({
                        title: 'Zalogowano!',
                        description: 'Udalo sie zalogowac',
                        isClosable: true,
                        duration: 3000
                    })
                    setAuthorized(true);
                    onClose();
                } else {
                    setError("Nie udalo sie zalogowac");
                }
            })).catch((error) => {
                console.error(error);
                setError("Blad logowania!");
            });

        }
    }

    return (
        <>

            < Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                < ModalContent >
                    <ModalHeader>Zaloguj sie</ModalHeader>
                    < ModalCloseButton />
                    <ModalBody>
                        <VStack gap={4} alignItems="self-start">
                            <Input type="text" placeholder="Email" value={user.email}
                                onChange={(e) => { setUser({ ...user, email: e.target.value }); }} />
                            <Input type="password" placeholder="Haslo" value={user.password}
                                onChange={(e) => { setUser({ ...user, password: e.target.value }); }} />
                            <span className="error">{error}</span>
                        </VStack>
                    </ModalBody>

                    < ModalFooter >
                        <Button variant='ghost' mr={3} onClick={onClose} >
                            Zamknij
                        </Button>
                        < Button colorScheme='blue' onClick={onSubmit}> Zaloguj </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default LogAddForm