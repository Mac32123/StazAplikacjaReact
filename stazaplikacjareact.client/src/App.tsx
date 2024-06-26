import { useToast, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton, useDisclosure, HStack, Button, Flex, Heading, Box, TableContainer, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react'
import { ViewIcon, DeleteIcon, EditIcon, AddIcon } from '@chakra-ui/icons';
import axios from 'axios';
import './App.css';
import { BASE_URL } from './constant';
import { useEffect, useState } from 'react';
import { Contact } from './types/contact';
import ContactAddForm from './Components/ContactAddForm';
import ViewDetails from './Components/ViewDetails';
import LogAddForm from './Components/LogAddForm';
import RegAddForm from './Components/regAddForm';

function App() {

    const { isOpen, onClose, onOpen } = useDisclosure();
    const { isOpen:viewDialogOpen, onClose:viewDialogClose, onOpen:onViewDialogOpen } = useDisclosure();
    const { isOpen:logDialogOpen, onClose: logDialogClose, onOpen: onlogDialogOpen } = useDisclosure();
    const { isOpen: regDialogOpen, onClose: regDialogClose, onOpen: onregDialogOpen } = useDisclosure();

    const [currentData, setCurrentData] = useState<Contact>({} as Contact);
    const [data, setData] = useState<Contact[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [authorized, setAuthorized] = useState<boolean>(false);
    const toast = useToast();

    useEffect(() => {
        fetchData();
    }, [])


    //pobieranie danych do tabeli

    const fetchData = () => {
        setIsLoading(true);
        axios.get(BASE_URL + "Contacts").then((response) => {
            setData(response.data);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setIsLoading(false);
        });

    }

    //pobieranie pojedynczej danej do zedytowania jej

    const getContact = (id:number) => {
        axios.get<Contact>(BASE_URL + "Contacts/" + id)
            .then((res) => {
                setCurrentData(res.data);
                onOpen();
            }).catch((error) => {
                console.log(error);
            });
    }

    //handler do dodawania kontaktów - usuwane s¹ wszystkie dane zapamiêtane podczas edycji

    const handleAdd = () => {
        setCurrentData({} as Contact)
        onOpen();
    }

    //handler do usuwania kontaktów z bazy danych i tabeli

    const onDeleteHandle = (id: number) => {
        axios.delete(BASE_URL + "Contacts/" + id).then(() => {
            toast({
                title: "Usunieto kontakt",
                description: "Pomyslnie usunieto kontakt z listy",
                isClosable: true,
                duration: 3000
            })
            fetchData();
        }).catch((error) => {
            console.log(error);
        })
    }

    const onLogout = () => {
        axios.post(BASE_URL + "logout", "").then((res) => {
            if (res.status == 200) {
                setAuthorized(false);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    //handler do przegl¹dania kontaktów

    const handleViewDetails = (id: number) => {
        axios.get<Contact>(BASE_URL + 'Contacts/' + id).then((res) => {
            setCurrentData(res.data);
            onViewDialogOpen();
        }).catch((error) => {
            console.log(error);
        });
    }


    return(
        <Box shadow={"md"} rounded={"md"} m={30}>
            {!authorized && <Flex px="5" justifyContent="flex-end" gap="3" mb="5">
                <Button variant='ghost' textColor="blue"
                    onClick={() => onlogDialogOpen()}>
                    Zaloguj sie
                </Button>
                <Button variant='ghost' textColor="blue"
                    onClick={() => onregDialogOpen()}>
                    Zarejestruj sie
                </Button>
            </Flex>}
            {authorized && <Flex px="5" justifyContent="flex-end" gap="3" mb="5">
                <Button variant='ghost' textColor="blue">
                    Zalogowano!
                </Button>
                <Button variant='ghost' textColor="blue"
                    onClick={() => onLogout()}>
                    Wyloguj sie
                </Button>
            </Flex>}
            <Flex px="5" justifyContent={"space-between"} mb="5">
                <Heading>
                    Kontakty
                </Heading>
                {authorized && <Button colorScheme="blue" leftIcon={<AddIcon />}
                    onClick={() => handleAdd()}>
                    Dodaj kontakt
                </Button>}
            </Flex>
        <TableContainer>
            <Table variant='striped' colorScheme='teal'>
                <Thead>
                    <Tr>
                        <Th>Imie</Th>
                        <Th>Nazwisko</Th>
                            <Th>Numer telefonu</Th>
                            <Th>Akcja</Th>
                    </Tr>
                </Thead>
                <Tbody>
                        {
                            data.map((contact: Contact) => (
                                <Tr key={contact.id}>
                                    <Td>{contact.name}</Td>
                                    <Td>{contact.surname}</Td>
                                    <Td >{contact.phoneNumber}</Td>
                                    <Td >
                                        {authorized && <HStack gap={3}>
                                            <EditIcon boxSize={22} color={'blue'} onClick={() => getContact(contact.id)} />
                                            <Popover>
                                                <PopoverTrigger>
                                                    <DeleteIcon boxSize={22} color={'red'} />
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                    <PopoverArrow />
                                                    <PopoverCloseButton />
                                                    <PopoverHeader>Potwierdzenie!</PopoverHeader>
                                                    <PopoverBody>Czy na pewno chcesz usunac ten kontakt?</PopoverBody>
                                                    <PopoverFooter>
                                                        <Button colorScheme='red' float='right' onClick={() => onDeleteHandle(contact.id)}>Usun</Button>
                                                    </PopoverFooter>
                                                </PopoverContent>
                                            </Popover>
                                            <ViewIcon boxSize={22} color={'grey'} onClick={() => handleViewDetails(contact.id)} />
                                        </HStack>}
                                    </Td>
                                </Tr>
                            ))
                        }
                </Tbody>
            </Table>
            </TableContainer>
            {isOpen && <ContactAddForm
                currentData={currentData}
                isOpen={isOpen}
                fetchContact={fetchData}
                onClose={onClose}
            />}

            {logDialogOpen && <LogAddForm
                isOpen={logDialogOpen}
                onClose={logDialogClose}
                setAuthorized={setAuthorized}
            />}

            {regDialogOpen && <RegAddForm
                isOpen={regDialogOpen}
                onClose={regDialogClose}
                setAuthorized={setAuthorized}
            />}

            {viewDialogOpen && <ViewDetails
                currentData={currentData}
                isOpen={viewDialogOpen}
                onClose={viewDialogClose}
            />}

        </Box>
    );
}


export default App;