const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

// dashboard data
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId)); // converting userId to object id for querying database

    //Fetch total income and expenses

    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    console.log("totalIncome ", {
      totalIncome,
      userId: isValidObjectId(userId),
    });

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    //Get income transactions in the last 60 days
    // Ye code Income collection se wo saare transactions fetch karta hai jo:
    // Specific user (userId) ke hain.
    // Last 60 days ke andar ke hain.
    // Aur unhe latest date ke hisaab se sort karta hai (newest first).

    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    //Get total income for last 60 days
    // Ye niche wala code last60DaysIncomeTransactions array ke har transaction ka amount add karta hai aur
    // total income incomeLast60Days variable mein store karta hai.

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    //Get expense transactions in the last 60 days

    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    //get total expense for last 30 days
    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // Fetch last 5 transactions (income + expenses)
    // part 1 : Ye code Income collection se latest 5 transactions fetch karta hai jo specific userId ke hain,
    //   unhe date ke hisaab se sort karta hai, har transaction mein type: "income" add karta hai,
    //     aur unhe ek array ke roop mein spread karta hai.

    // part 2 : Ye code Expense collection se latest 5 transactions fetch karta hai,
    //   unme type: "expense" add karta hai, aur unhe array mein spread karta hai.

    // part 3 : Ye code income aur expense ke transactions ko ek array mein combine karta
    //  hai aur unhe date ke hisaab se sort karta hai taaki latest transactions pehle aaye.

    const lastTransactions = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
        // part 1
        (txn) => ({
          ...txn.toObject(),
          type: "income",
        })
      ),

      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
        //part 2
        (txn) => ({
          ...txn.toObject(),
          type: "expense",
        })
      ),
    ].sort((a, b) => b.date - a.date); // part 3
    // Final Response
    res.json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),

      totalIncome: totalIncome[0]?.total || 0,

      totalExpenses: totalExpense[0]?.total || 0,

      last30DaysExpenses: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions,
      },

      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },

      recentTransactions: lastTransactions,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error ", error });
  }
};
