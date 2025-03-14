
const updateRunningBalances = async() => {
    // Get all distinct users
    console.log("Updating running balances...");
    
    const users = await Add.distinct("email");

    for (const email of users) {
        console.log(`Updating running balance for: ${email}`);

        // Fetch all transactions of the user, sorted by date
        const transactions = await Add.find({ email }).sort({ createdAt: 1 });

        let runningBalance = 0;

        for (const transaction of transactions) {
            // Compute new balance
            runningBalance += transaction.deduction ? -transaction.amount : transaction.amount;

            // Update the document
            await Add.updateOne({ _id: transaction._id }, { $set: { runningBalance } });
        }
    }

    return "Running balances updated successfully";
}

// Run the script
// updateRunningBalances().catch(console.error);
