import { Text, Button, Drawer, Heading, HStack, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton} from '@chakra-ui/react'
import { Contact } from '../types/contact';
import { useEffect, useState } from 'react';
import { Category } from '../types/category';
import axios from 'axios';
import { BASE_URL } from '../constant';

type ViewDetailsProps = {
    isOpen: boolean;
    onClose: () => void;
    currentData: Contact;
}

const ViewDetails = ({ isOpen, onClose, currentData }: ViewDetailsProps) => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetchCategories();
        fetchSubCategories();
    }, [])

    //pobranie z serwera podkategorii zwi¹zanych z kategori¹ S³u¿bowy

    const fetchSubCategories = () => {
        axios.get(BASE_URL + 'SluzbowySubCategory').then((res) => {
            setSubCategories(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    //pobranie z serwera kategorii

    const fetchCategories = () => {
        axios.get(BASE_URL + 'Category').then((res) => {
            setCategories(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }

            return (
                <>
                    <Drawer
                        isOpen={isOpen}
                        placement='right'
                        onClose={onClose}
                    >
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerHeader>Szczegoly kontaktu</DrawerHeader>

                            <DrawerBody>
                                    <Heading fontSize={20}>
                                        {currentData.name} {currentData.surname}
                                    </Heading>
                                    <Text>
                                        Email: {currentData.email} <br />
                                        Numer telefonu: {currentData.phoneNumber} <br />
                                        Haslo: {currentData.password} <br />
                                        Data urodzenia: {new Date(currentData.birthDate).toISOString().substring(0, 10)} <br />
                                        Kategoria: {categories[currentData.categoryId -1] ? categories[currentData.categoryId - 1].name : ""} <br />
                                        {currentData.categoryId == 1 && <>Podkategoria: {subCategories[currentData.sluzbowySubCategoryId -1] ? subCategories[currentData.sluzbowySubCategoryId - 1].name : ""} <br/></> }
                                        {currentData.otherCategory && <>Podkategoria: {currentData.otherCategory} <br/></> }
                                        </Text>
                            </DrawerBody>

                            <DrawerFooter>
                                <Button variant='outline' mr={3} onClick={onClose}>
                                    Zamknij
                                </Button>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </>
            )
        }

export default ViewDetails