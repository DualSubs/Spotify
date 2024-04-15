export default function modifiedAssignedValues(assignedValues = []) {
    assignedValues = assignedValues.map(assignedValue => {
        switch (assignedValue?.propertyId?.scope) {
            case "ios-feature-reinventfree":
                switch (assignedValue?.propertyId?.name) {
                    case "is_india_quicksilver_campaign_enabled":
                        assignedValue.boolValue.value = false;
                        break;
                };
                break;
            case "ios-liveaudio-livestreampage":
                switch (assignedValue?.propertyId?.name) {
                    case "context_menu_enabled":
                        assignedValue.boolValue.value = true;
                        break;
                };
                break;
        };
        return assignedValue;
    }).filter(Boolean);
}
