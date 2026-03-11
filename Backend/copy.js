// const getMonthlyTotal = async (req, res) => {
//     try {
//       const userId = req.userId;
  
//       const monthlyData = await Expense.aggregate([
//         {
//           $match: { user: new mongoose.Types.ObjectId(userId) }
//         },
//         {
//           $group: {
//             _id: {
//               year: { $year: "$date" },
//               month: { $month: "$date" }
//             },
//             totalAmount: { $sum: "$amount" }
//           }
//         },
//         {
//           $sort: { "_id.year": 1, "_id.month": 1 }
//         }
//       ]);
  
//       res.status(200).json(monthlyData);
  
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };