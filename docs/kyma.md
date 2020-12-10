## Deploy to Kyma

Since October 2020 the [Kyma runtime is available in trial](https://blogs.sap.com/2020/10/09/kyma-runtime-available-in-trial-and-now-we-are-complete/) so you can now also run a first test of abaplint-sci-server without any costs. Here is how.

Download the kubeconfig from your Kyma instance via the menu behind the account Icon in the upper right corner. Save it in *~/.kube/kubeconfig-kyma.yml*. Then run:

`export KUBECONFIG=~/.kube/kubeconfig-kyma.yml`

Please note that the token in the kubeconfig is [only valid for 8 hours](https://kyma-project.io/docs/components/security#details-iam-kubeconfig-service). So you might have to redo the download whenever you want to run the commands again.

To keep this project separate from your other deployments I would suggest to create a namespace:

`kubectl create namespace abaplint-sci-server`

Deploy the configuration:

`kubectl -n abaplint-sci-server apply -f kyma/abaplint-sci-server.yaml`