import { createBrowserRouter } from "react-router-dom";
import { SuperheroesListPage } from "../features/superheroes/pages/SuperheroesListPage";
import { SuperheroCreatePage } from "../features/superheroes/pages/SuperheroCreatePage.tsx";
import { SuperheroDetailsPage } from "../features/superheroes/pages/SuperheroDetailsPage.tsx";
import { SuperheroEditPage } from "../features/superheroes/pages/SuperheroEditPage.tsx";
import { AppLayout } from "../ui/AppLayout.tsx";

export const router = makeRouter();

function makeRouter() {
    return createBrowserRouter([
        {
            path: "/",
            Component: AppLayout,
            children: [
                {
                    path: "/",
                    Component: SuperheroesListPage,
                },
                {
                    path: "/superheroes/new",
                    Component: SuperheroCreatePage,
                },
                {
                    path: "/superheroes/:id",
                    Component: SuperheroDetailsPage,
                },
                {
                    path: "/superheroes/:id/edit",
                    Component: SuperheroEditPage,
                },
            ],
        },
    ]);
}
