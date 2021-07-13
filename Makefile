deploy:
	gcloud functions deploy example-google-cloud-function \
    	--runtime nodejs12 \
    	--allow-unauthenticated \
    	--trigger-http \
    	--entry-point probotApp \
    	--set-env-vars NODE_OPTIONS="",APP_ID="${{APP_ID}}",PRIVATE_KEY="${{PRIVATE_KEY}}",WEBHOOK_SECRET="${{WEBHOOK_SECRET}}"