/* eslint-disable react-hooks/exhaustive-deps */
import { Select, VStack, Input, Modal, Text, ModalOverlay, ModalHeader, ModalBody, Button, ModalFooter, ModalContent, ModalCloseButton, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { BASE_URL } from '../constant';
import axios from 'axios';
import { Contact } from '../types/contact';
import { match } from 'assert';
import { Category } from '../types/category';

type ContactFormProps =
    {
        isOpen: boolean;
        onClose: () => void;
        fetchContact: () => void;
        currentData?: Contact;
    }

const ContactAddForm = ({ isOpen, onClose, fetchContact, currentData }: ContactFormProps) => {

    const toast = useToast();
    const [contact, setContact] = useState(
        {
            id: currentData?.id || 0,
            name: currentData?.name || "",
            surname: currentData?.surname || "",
            password: currentData?.password || "",
            email: currentData?.email || "",
            phoneNumber: currentData?.phoneNumber || "",
            birthDate: currentData?.birthDate || new Date(),
            sluzbowySubCategoryId: currentData?.sluzbowySubCategoryId || null,
            otherCategory: currentData?.otherCategory || null,
            categoryId: currentData?.categoryId || 1
        }
    );
    const [categories, setCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<Category[]>([]);

    const [errors, setErrors] = useState({});
    const [header, setHeader] = useState("Dodaj");

    useEffect(() => {
        fetchCategories();
        fetchSubCategories();
        if (currentData.id) {
            setHeader("Edytuj");
        }
        else {
            setHeader("Dodaj");
        }
    }, [])


    //pobranie kategorii z serwera

    const fetchCategories = () => {
        axios.get(BASE_URL + 'Category').then((res) => {
            setCategories(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    //pobranie podkategorii zwi¹zanych z kategori¹ "S³u¿bowy" z serwera

    const fetchSubCategories = () => {
        axios.get(BASE_URL + 'SluzbowySubCategory').then((res) => {
            setSubCategories(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    //obs³u¿enie zapisu kontaktu - edycja czy nowy kontakt

    const onSave = () => {
        if (currentData.id) {
            editContact();
        }
        else {
            addContact();
        }
    }

    //dodanie nowego kontaktu

    const addContact = () => {
        axios.post(BASE_URL + 'Contacts', contact).then(() => {
            onClose();
            fetchContact();
            toast({
                title: 'Dodano kontakt!',
                description: 'Poprawnie dodano kontakt do listy',
                isClosable: true,
                duration: 3000
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    //edycja istniej¹cego kontaktu

    const editContact = () => {
        axios.put(BASE_URL + 'Contacts/' + currentData?.id, contact)
            .then(() => {
            onClose();
            fetchContact();
            toast({
                title: 'Zaktualizowano kontakt!',
                description: 'Poprawnie zaktualizowano kontakt z listy',
                isClosable: true,
                duration: 3000
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    //sprawdzenie, czy wszystkie dane s¹ poprawne 

    const Validation = () => {
        const formErrors = {};
        let formIsValid = true;
        const formFields = { ...contact };
        if (!formFields["name"]) {
            formIsValid = false;
            formErrors["name"] = "To pole jest wymagane"
        }
        if (typeof formFields["name"] !== "undefined") {
            if (formFields["name"].length > 50) {
                formIsValid = false;
                formErrors["name"] = "Zbyt dluga nazwa";
            }
        }
        if (!formFields["surname"]) {
            formIsValid = false;
            formErrors["surname"] = "To pole jest wymagane"
        }
        if (typeof formFields["surname"] !== "undefined") {
            if (formFields["surname"].length > 50) {
                formIsValid = false;
                formErrors["surname"] = "Zbyt dluga nazwa";
            }
        }
        if (!formFields["email"]) {
            formIsValid = false;
            formErrors["email"] = "To pole jest wymagane"
        }
        if (typeof formFields["email"] !== "undefined") {
            if (!formFields["email"].match("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
                formIsValid = false;
                formErrors["email"] = "Niepoprawny email";
            }
        }
        if (!formFields["password"]) {
            formIsValid = false;
            formErrors["password"] = "To pole jest wymagane"
        }
        if (typeof formFields["password"] !== "undefined") {
            if (!formFields["password"].match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")) {
                formIsValid = false;
                formErrors["password"] = "Haslo musi skladac sie z przynajmniej 8 znakow, zawierac przynajmniej jedna duza i mala litere oraz znak specjalny";
            }
        }
        if (!formFields["phoneNumber"]) {
            formIsValid = false;
            formErrors["phoneNumber"] = "To pole jest wymagane"
        }
        if (typeof formFields["phoneNumber"] !== "undefined") {
            if (!formFields["phoneNumber"].match("(\\+[0-9]{2})?[0-9]{9}")) {
                formIsValid = false;
                formErrors["phoneNumber"] = "Niepoprawny numer telefonu";
            }
        }
        if (!formFields["birthDate"]) {
            formIsValid = false;
            formErrors["birthDate"] = "To pole jest wymagane"
        }
        setErrors(formErrors);
        return formIsValid;
    }

    //obs³u¿enie klikniêcia przycisku zapisz - walidacja i zapisanie

    const onSubmit = (e) => {
        e.preventDefault();
        if (contact.categoryId != 1) contact.sluzbowySubCategoryId = null;
        if (contact.categoryId != 3) contact.otherCategory = null;
        if (Validation()) {
            onSave();
        }
        else {
            alert("Formularz zawiera bledy!");
        }
    }

            return (
                <>

                    < Modal isOpen = { isOpen } onClose = { onClose } >
                        <ModalOverlay />
                        < ModalContent >
                            <ModalHeader>{header} kontakt</ModalHeader>
                            < ModalCloseButton />
                            <ModalBody>
                                <VStack gap={4} alignItems="self-start">
                                    <Input type="text" placeholder="Imie" value={contact.name}
                                        onChange={(e) => { setContact({ ...contact, name: e.target.value }); }} />
                                    <span className="error">{errors["name"]}</span>
                                    <Input type="text" placeholder="Nazwisko" value={contact.surname}
                                        onChange={(e) => { setContact({ ...contact, surname: e.target.value }); }} />
                                    <span className="error">{errors["surname"]}</span>
                                    <Input type="text" placeholder="Email" value={contact.email}
                                        onChange={(e) => { setContact({ ...contact, email: e.target.value });}} />
                                    <span className="error">{errors["email"]}</span>
                                    <Input type="text" placeholder="Haslo" value={contact.password}
                                        onChange={(e) => { setContact({ ...contact, password: e.target.value }); }} />
                                    <span className="error">{errors["password"]}</span>
                                    <span>Wybierz kategorie kontaktu</span>
                                    <Select value={contact.categoryId} onChange={(e) => { setContact({ ...contact, categoryId: Number(e.target.value) }); }}>
                                        {
                                        categories.map((category: Category) => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                            ))
                                        }
                                    </Select>
                                    {contact.categoryId == 1 &&
                                        <Select value={contact.sluzbowySubCategoryId || 1} onChange={(e) => { setContact({ ...contact, sluzbowySubCategoryId: Number(e.target.value) }); }}>
                                    {
                                        subCategories.map((subCategory: Category) => (
                                            <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
                                        ))
                                    }
                                </Select>
                                    } 
                                    {contact.categoryId == 3 &&
                                        <Input type="text" placeholder="Podkategoria" value={contact.otherCategory || ""}
                                            onChange={(e) => { setContact({ ...contact, otherCategory: e.target.value }); }}/>
                                    }
                                    <Input type="text" placeholder="Numer telefonu" value={contact.phoneNumber}
                                        onChange={(e) => { setContact({ ...contact, phoneNumber: e.target.value }); }} />
                                    <span className="error">{errors["phoneNumber"]}</span>
                                    <Text fontSize={15}>Data urodzenia</Text>
                                    <span className="error">{errors["birthDate"]}</span>
                                    <Input type="date" value={new Date(contact.birthDate).toISOString().substring(0, 10)}
                                        onChange={(e) => { if (!isNaN(new Date(e.target.value).getTime())) setContact({ ...contact, birthDate: new Date(e.target.value) }); }} />
                                </VStack>
                            </ModalBody>

                            < ModalFooter >
                                <Button variant='ghost' mr = { 3} onClick = { onClose } >
                                    Zamknij
                                </Button>
                                < Button colorScheme='blue' onClick={onSubmit}> Zapisz </Button>
                                        </ModalFooter>
                                        </ModalContent>
                                        </Modal>
                                        </>
  );
}

export default ContactAddForm