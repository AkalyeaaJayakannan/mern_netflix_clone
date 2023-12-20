const router = require("express").Router();
const List = require("../models/List");
const verify = require("../verifyToken");

//CREATE
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);
    try {
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch (err) {
      res.status(500).json({ error: "An error occurred" });
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedList = await List.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(201).json(updatedList);
    } catch (err) {
      res.status(500).json({ error: "An error occurred" });
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(201).json("The list has been deleted!");
    } catch (err) {
      res.status(500).json({ error: "An error occurred" });
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//GET
router.get("/", verify, async (req, res) => {
  const typeQuerry = req.query.type;
  const genreQuerry = req.query.genre;

  let list = [];
  try {
    if (typeQuerry) {
      if (genreQuerry) {
        list = await List.aggregate([
          { $match: { type: typeQuerry, genre: genreQuerry } },
          { $sample: { size: 10 } },
        ]);
      } else {
        list = await List.aggregate([
          { $match: { type: typeQuerry } },
          { $sample: { size: 10 } },
        ]);
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }

    res.status(201).json(list);
  } catch (err) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// get all lists
router.get("/all", verify, async (req, res) => {
  try {
    const allList = await List.find().sort({ _id: -1 });
    res.status(200).json(allList);
  } catch (err) {
    res.status(500).json({ error: "There was an error in getting all lists." });
  }
});

router.get("/find/:listId", verify, async (req, res) => {
  const id = req.params.listId;
  try {
    const list = List.findById(id);
    res.status(201).json(list);
  } catch (err) {
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
