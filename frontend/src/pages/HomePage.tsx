import ContainerFilter from '../components/MovieFilter';
import Header from '../components/Header';
import { useState } from 'react';
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
import Logout from '../components/Logout';
import MovieList from '../components/MovieList';

function HomePage() {
  const [selectedContainers, setSelectedContainers] = useState<string[]>([]);
  return (
    <AuthorizeView>
      <span>
        <Logout>
          Logout <AuthorizedUser value="email" />
        </Logout>
      </span>
      <div className="Container mt-4">
        <Header />
        <div className="row">
          <div className="col-md-3">
            <ContainerFilter
              selectedContainers={selectedContainers}
              setSelectedContainers={setSelectedContainers}
            />
          </div>
          <div className="col-md-9">
            <MovieList selectedContainers={selectedContainers} />
          </div>
        </div>
      </div>
    </AuthorizeView>
  );
}
export default HomePage;
