last=$(date +%s)

echo "{ \"lastUpdate\": $last }" > src/last-update.json
