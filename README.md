# MU AKS KM REST API app

Notes:

- This `<PLACEHOLDER>-mu-ask-api-km` project only has 1 endpoint `~/api/v1/provinces-territories` which is used by the `<PLACEHOLDER>-mu-ask-react-km` project.

- Your goal is to deploy this application to our AKS cluster and let `<PLACEHOLDER>-mu-ask-react-km` connect to it. Existing code works fine and updating it won't necessary bring you any extra credits - the app development part is not the point for this test.

- In project root folder, there is a `data.js` file which can be used to serve the hard-coded data to the endpoint.

- In the code, it will expect an envrionment variable named `APP_DB_HOST` at run time. If there is and it is a truthy value, it will read from db by using the connection string that's specified in `.env` file. If there isn't, by default, it will use `data.js` instead.

- When you work on the database part, you will need to create a database with table `provinces_territories` with seeded data (check `repository.js` for details), update `.env` with connection string, then find a way to inject value of `APP_DB_HOST` to node at run time. Of course, you can also modify code to just read from db as another option but I recommand you explore a bit and have some fun.

- You are responsible for adding necessary **projects/files** to work with **Docker/Kubernetes/Helm/JGP...**

- Please save and commit all your changes by the end of the KM.

Happy KM-ing!
