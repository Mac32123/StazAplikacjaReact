/* eslint-disable react-hooks/exhaustive-deps */
import { VStack, Input, Modal, ModalOverlay, ModalHeader, ModalBody, Button, ModalFooter, ModalContent, ModalCloseButton, useToast } from '@chakra-ui/react'
import { useState } from 'react';
import { BASE_URL } from '../constant';
import axios from 'axios';

type RegFormProps =
    {
        isOpen: boolean;
        onClose: () => void;
        setAuthorized: (e: boolean) => void;
    }

const RegAddForm = ({ isOpen, onClose, setAuthorized }: RegFormProps) => {

    const toast = useToast();

    //zmienne reprezentuj¹ce u¿ytkownika
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [error, setError] = useState<string>("");

    //próba rejestracji u¿ytkownika po klikniêciu przycisku zarejestruj

    const onSubmit = () => {
        
        if (!user.email || !user.password || !confirmPassword) {
            setError("Prosze wypelnic wszystkie pola.");
        }
        else if (!user.email.match("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"))
        {
            setError("Niepoprawny email");
        }
        else if (!user.password.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")) {
            setError("Niepoprawne haslo - haslo musi zawierac przynajmniej 8 znakow, mala i duza litere oraz znak specjalny");
        }
        else if (user.password !== confirmPassword) {
            setError("Hasla musza sie zgazdzac");
        }
        else {
            setError("");

            axios.post(BASE_URL + "register", user).then((res => {
                console.log(res.data);
                if (res.status == 200) {
                    toast({
                        title: 'Rejestracja udana!',
                        description: 'Poprawnie zarejestrowano uzytkownika',
                        isClosable: true,
                        duration: 3000
                    })
                    setAuthorized(true);
                    onClose();
                } else {
                    setError("Rejestracja nie powiodla sie");
                }
                //sprawdziæ, czy nie istnieje ju¿ takie konto
            })).catch((error) => {
                console.error(error);
                setError("U¿ytkownik o danym emailu ju¿ jest zarejestrowany");
            });

        }
    }

    return (
        <>

            < Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                < ModalContent >
                    <ModalHeader>Zarejestruj sie</ModalHeader>
                    < ModalCloseButton />
                    <ModalBody>
                        <VStack gap={4} alignItems="self-start">
                            <Input type="text" placeholder="Email" value={user.email}
                                onChange={(e) => { setUser({ ...user, email: e.target.value }); }} />
                            <Input type="password" placeholder="Haslo" value={user.password}
                                onChange={(e) => { setUser({ ...user, password: e.target.value }); }} />
                            <Input type="password" placeholder="Powtorz haslo" value={confirmPassword}
                                onChange={(e) => { setConfirmPassword(e.target.value); }} />
                                <span className="error">{error}</span>
                        </VStack>
                    </ModalBody>

                    < ModalFooter >
                        <Button variant='ghost' mr={3} onClick={onClose} >
                            Zamknij
                        </Button>
                        < Button colorScheme='blue' onClick={onSubmit}> Zarejestruj </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default RegAddForm