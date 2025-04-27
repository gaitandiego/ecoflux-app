import { useLocation, useNavigate, useParams } from 'react-router-dom';

// Crea los parametros globales en el props de react router dom
export const withRouter = (Component) => {
    const Wrapper = (props) => {
        const location = useLocation();
        const navigate = useNavigate()
        const params = useParams()

        const handleScrollById = (id, offset = 50) => {
            const elementToScroll = document.getElementById(id);

            if (!elementToScroll) return;
            window.scrollTo({
                top: elementToScroll.offsetTop - offset,
                behavior: "smooth"
            });
        }

        return (
            <Component
                location={location}
                navigate={navigate}
                goBack={() => navigate(-1)}
                params={params}
                handleScrollById={handleScrollById}
                {...props}
            />
        );
    };

    return Wrapper;
};