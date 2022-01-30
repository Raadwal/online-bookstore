import { Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout"
import Information from "./components/layout/Information";
import FormsNavigation from "./components/layout/FormsNavigation";
import ReportsNavigation from "./components/layout/ReportsNavigation";
import AddBookForm from "./components/forms/AddBookForm";
import BooksReport from "./components/reports/BooksReport";
import PublishersReport from "./components/reports/PublishersReport";
import AuthorsReport from "./components/reports/AuthorsReport";
import AuthorsBooksReport from "./components/reports/AuthorsBooksReport";
import ManagersReport from "./components/reports/ManagersReport";
import WarehousesReport from "./components/reports/WarehousesReport";
import WarehousesBooksReport from "./components/reports/WarehousesBooksReport";
import AddressesReport from "./components/reports/AddressesReport";
import ClientsReport from "./components/reports/ClientsReport";
import OrdersReports from "./components/reports/OrdersReport";
import DeliveryMethodsReport from "./components/reports/DeliveryMethodsReport";
import ScoreReport from "./components/reports/ScoreReport";
import AddPublisherForm from "./components/forms/AddPublisherForm";
import AddAuthorForm from "./components/forms/AddAuthorForm";
import AddAuthorBookForm from "./components/forms/AddAuthorBookForm";
import AddManagerForm from "./components/forms/AddManagerForm";
import AddWarehouseForm from "./components/forms/AddWarehouseForm";
import AddWarehouseBookForm from "./components/forms/AddWarehouseBookForm";
import AddAddressForm from "./components/forms/AddAddressForm";
import AddClientForm from "./components/forms/AddClientForm";
import AddOrderForm from "./components/forms/AddOrderForm";
import AddDeliveryMethodForm from "./components/forms/AddDeliveryMethodForm";
import AddScoreForm from "./components/forms/AddScoreForm";
import AddExampleDataForm from "./components/forms/AddExampleDataForm";
import AdvancedReportsNavigation from "./components/layout/AdvancedReportsNavigation";
import BestBooksReport from "./components/advanced-reports/BestBooksReport";
import BestAuthorsReport from "./components/advanced-reports/BestAuthorsReport";
import PopularBooksReport from "./components/advanced-reports/PupularBooksReport";
import PopularAuthorsReport from "./components/advanced-reports/PopularAuthorsReport";
import PublisherEarningsReport from "./components/advanced-reports/PublishersEarningsReport";
import LowStocksReport from "./components/advanced-reports/LowStocksReport";
import AdvancedFormsNavigation from "./components/layout/AdvancedFormsNavigation";
import AdvancedAddBook from "./components/advanced-forms/AdvancedAddBook";
import AdvancedWarehouseForm from "./components/advanced-forms/AdvancedWarehouseForm";
import AdvancedAddBooksToWarehouse from "./components/advanced-forms/AdvancedAddBooksToWarehouse";

function App() {
  return (
      <Layout>
        <Routes>
          <Route path="/" element={<Information />}/>
          <Route path="/forms" element={<FormsNavigation />}/>
          <Route path="/reports" element={<ReportsNavigation />}/>
          <Route path="/advanced-reports" element={<AdvancedReportsNavigation />}/>
          <Route path="/advanced-forms" element={<AdvancedFormsNavigation />}/>

          <Route path="/forms/add-book" element={<AddBookForm />}/>
          <Route path="/forms/add-publisher" element={<AddPublisherForm />}/>
          <Route path="/forms/add-author" element={<AddAuthorForm />}/>
          <Route path="/forms/add-author-publisher" element={<AddAuthorBookForm />}/>
          <Route path="/forms/add-manager" element={<AddManagerForm />}/>
          <Route path="/forms/add-warehouse" element={<AddWarehouseForm />}/>
          <Route path="/forms/add-warehouse-book" element={<AddWarehouseBookForm />}/>
          <Route path="/forms/add-address" element={<AddAddressForm />}/>
          <Route path="/forms/add-client" element={<AddClientForm />}/>
          <Route path="/forms/add-order" element={<AddOrderForm />}/>
          <Route path="/forms/add-delivery-method" element={<AddDeliveryMethodForm />}/>
          <Route path="/forms/add-score" element={<AddScoreForm />}/>
          <Route path="/forms/add-example-data" element={<AddExampleDataForm />}/>

          <Route path="/reports/books" element={<BooksReport />} />
          <Route path="/reports/publishers" element={<PublishersReport />} />
          <Route path="/reports/authors" element={<AuthorsReport />} />
          <Route path="/reports/authors-books" element={<AuthorsBooksReport />} />
          <Route path="/reports/managers" element={<ManagersReport />} />
          <Route path="/reports/warehouses" element={<WarehousesReport />} />
          <Route path="/reports/warehouses-books" element={<WarehousesBooksReport />} />
          <Route path="/reports/addresses" element={<AddressesReport />} />
          <Route path="/reports/clients" element={<ClientsReport />} />
          <Route path="/reports/orders" element={<OrdersReports />} />
          <Route path="/reports/orders-methods" element={<DeliveryMethodsReport />} />
          <Route path="/reports/scores" element={<ScoreReport />} />

          <Route path="/advanced-reports/best-books" element={<BestBooksReport />}/>
          <Route path="/advanced-reports/best-authors" element={<BestAuthorsReport />}/>
          <Route path="/advanced-reports/most-popular-books" element={<PopularBooksReport />}/>
          <Route path="/advanced-reports/most-popular-authors" element={<PopularAuthorsReport />}/>
          <Route path="/advanced-reports/publisher-earnings" element={<PublisherEarningsReport />}/>
          <Route path="/advanced-reports/low-stock" element={<LowStocksReport />}/>

          <Route path="/advanced-forms/add-book" element={<AdvancedAddBook />}/>
          <Route path="/advanced-forms/add-warehouse" element={<AdvancedWarehouseForm />}/>
          <Route path="/advanced-forms/add-books-warehouse" element={<AdvancedAddBooksToWarehouse />}/>
        </Routes>
      </Layout>
  );
}

export default App;
