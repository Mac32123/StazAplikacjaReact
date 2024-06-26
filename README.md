# StazAplikacjaReact

1.	Aplikacja

Całość aplikacji została utworzona w programie Visual Studio 2022 na bazie szablonu „React and ASP.net Core”. Jak wskazuje nazwa szablonu backend został napisany przy użyciu ASP.net Core, a frontend w Reakcie (z językiem TypeScript). Do projektu dołączona jest baza danych SQLServer. 

2.	Backend

2.1.	Biblioteki
Do komunikacji z bazą danych wykorzystano EntityFrameworkCore
2.2 Klasy
Klasa AppDbContext dziedziczy po IdentityDbContext i odpowiada za inicjalizację bazy danych. Zawiera metodę OnModelCreating, w której zawarte są wszystkie akcje, które powinny zostać wykonane wraz z utworzeniem modelu, czyli przede wszystkim inicjalizacja potrzebnych od początku tabel w bazie danych. Pusta klasa ApplicationUser jest używana jako klasa odpowiadająca za użytkownika w bazie danych (odpowiednie pola i tabele są generowane automatycznie). Klasa Contact odpowiada za tabelę kontaktów w bazie danych, klasa Category za tabelę zawierającą kategorie kontaktu (odgórnie ustalone), klasa SluzbowySubCategory odpowiada za tabelę zawierającą podkategorię dla kategorii „Służbowy” (odgórnie ustalone). Kontroler CategoryController odpowiada za API dotyczące kontaktów. Metoda GetCategories() odpowiada za przekazanie klientowi wszystkich kategorii zapisanych w bazie, a metoda GetCategory(id) odsyła jedynie kategorię z zadanym id, lub błąd 404 w przypadku braku kategorii z zadanym id. Kontroler SluzbowySubCategoryController jest analogiczny do poprzedniego,  z tą różnicą, że odpowiada za podkategorie dla kategorii Służbowy. Kontroler ContactsController odpowiada za działania związane z kontaktami. Metoda Contacts() wysyła klientowi zbiór wszystkich kontaktów zapisanych w bazie danych, GetContact(id) odsyła tylko kontakt z zadanym id (lub error 404), CreateContact(contact) odpowiada za dodanie kontaktu do bazy danych, UpdateContact(id, contact) odpowiada za aktualizację kontaktu w bazie danych, a DeleteContact(id) za jego usunięcie.

3.	Frontend

3.1.	Biblioteki
Do wygodniejszego tworzenia UI wykorzystano chakra-ui. Do wysyłania żądań do serwera wykorzysano axios.
3.2.	Klasy
Stworzono dwie klasy odpowiadające 3 klasom bazodanowym z backendu – Contact (odpowiadający klasie Contact w backendzie) i Category (odpowiadający zarówno klasie Category jak i SluzbowySubCategory). Najważniejszą klasą jest klasa App, która odpowiada za strukturę strony – wykorzystuje, tak jak klasy z których korzysta, komponenty z Chakra-UI. Główne funkcje to fetchData – odpowiada za pobranie listy kontaktów z serwera, getContact – pobranie pojedynczego kontaktu do jego edycji, handleAdd – obsługa przycisku dodawania danych, onDeleteHandle – obsługa usuwania kontaktu, onLogout – obsługa wylogowania z aplikacji, handleViewDetails – pobiera kontakt o odpowiednim id i wyświetla go wraz ze szczegółami w specjalnym oknie. 4 klasy zawierają w sobie komponenty – są to klasy: ContactAddForm, która odpowiada za okno do dodawania i edycji kontaktów. Jej metody  to: fetchCategories – pobiera kategorie z serwera, fetchSubCategories – pobiera podkategorie związane z kategorią „Służbowy”, onSave – wywoływana przez metodę onSubmit i w zależności od tego, czy edytujemy kontakt czy dodajemy nowy wywołuje odpowiednią funkcję, addContact – wywoływana przez onSave, odpowiada za przesłanie serwerowi nowego kontaktu, editContact – wywoływana przez onSave, odpowiada za przesłanie serwerowi zedytowanego kontaktu, Validation – odpowiada za sprawdzenie czy wszystkie pola spełniają założone wcześniej warunki i wygenerowanie odpowiednich błędów, onSubmit – wywołuje się po wciśnięciu przycisku „zapisz”. Wywołuje walidację i odznacza podkategorie, a następnie wywołuje metodę onSave. Klasa LogAddForm odpowiada za okno do logowania. Posiada jedną metodę - onSubmit – dokonuje prostej walidacji, po której (jeżeli przebiegnie pomyślnie) następuje wysłanie żądania o zalogowanie. Klasa regAddForm –odpowiada za okno do rejestracji. Zawiera jedną metodę – onSubmit, która jest analogiczna do swojego odpowiednika w klasie LogAddForm, z tą różnicą, że wysyła żądanie o rejestrację użytkownika. Ostatnia klasa to ViewDetails, która odpowiada za pasek boczny ze szczegółami kontaktu. Posiada dwie metody – fetchCategories i fetchSubcategories, analogiczne do swoich odpowiedników w klasie ContactAddForm.
