const Chapter = require("../../models/chapter");

exports.chapterCreate = async (req, res) => {
  const chapter = new Chapter(req.body);

  try {
    await chapter.save();

    res.status(204).send();
  } catch (e) {
    res.status(500).json({
      message: "chapter 저장 실패",
    });
  }
};

exports.chapterList = async (req, res) => {
  try {
    const chapters = await Chapter.find({});

    res.status(200).send(chapters);
  } catch (e) {
    res.status(500).json({
      message: "chapter 조회 실패",
    });
  }
};

exports.chapterRead = async (req, res) => {
  const id = req.params.id;

  try {
    const chapter = await Chapter.findById(id);

    if (!chapter) {
      return res.status(404).send();
    }

    res.status(200).send(chapter);
  } catch (e) {
    res.status(500).json({
      message: "chapter 조회 실패",
    });
  }
};

exports.chapterUpdate = async (req, res) => {
  const id = req.params.id;

  try {
    // new가 true이면 수정된 문서를 반환
    // runValidators가 true인 경우 업데이트 유효성 검사기를 실행
    const chapter = await Chapter.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!chapter) {
      return res.status(404).send();
    }

    res.status(200).send(chapter);
  } catch (e) {
    res.status(500).json({
      message: "chapter 변경 실패",
    });
  }
};

exports.chapterDelete = async (req, res) => {
  const id = req.params.id;

  try {
    const chapter = await Chapter.findByIdAndDelete(id);

    if (!chapter) {
      return res.status(404).send();
    }

    res.status(200).send(chapter);
  } catch (e) {
    res.status(500).json({
      message: "chapter 삭제 실패",
    });
  }
};