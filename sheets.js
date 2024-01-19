async function makeGraphCallAsync(authSettings) {
    try {
      const results = await authSettings._userClient.api(`https://graph.microsoft.com/v1.0/sites/flairmindssoftwarepvtltd623.sharepoint.com/drives/b!KB42YsZcDk2UBdG4WeB2bVyG8uzAoDBInJfIeLJO78VJMz8M3j-yRJHdFGFGmuWc/items/01IIDQFKNVUZP6RPT6RVE3FSOAS5LDTABI/workbook/worksheets('Work plan')/range(address='a2:z131')?$select=values`).get()
      return results;
    } catch (err) {
      console.log(`Error making Graph call: ${err}`);
    }
}

module.exports = {makeGraphCallAsync}