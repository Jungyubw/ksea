const Specialty = require("../../models/specialty");
const MainSpecialty = require("../../models/msdef");
const papa = require('papaparse');
const fs = require('fs');

getspecialtyDEFs = function (ssDefs, msDefs) {
  let list = [];

  ssDefs.forEach(item => {
    const msFound = msDefs.find((def) => def.MainSpecialtyCode === item.MainSpecialtyCode);
    
    if(msFound) {
      let found = {
        SS_ID: item.SS_ID,
        SubSpecialtyCode: item.SubSpecialtyCode,
        SubSpecialtyDesc: item.SubSpecialtyDesc,
        MainSpecialtyCode: item.MainSpecialtyCode,
        MainSpecialtyDesc: msFound.MainSpecialtyDesc,
        NRFCode: item.NRFCode
      };    
      list.push(found);
    }
    else {
      let found = {
        SS_ID: item.SS_ID,
        SubSpecialtyCode: item.SubSpecialtyCode,
        SubSpecialtyDesc: item.SubSpecialtyDesc,
        MainSpecialtyCode: item.MainSpecialtyCode,
        NRFCode: item.NRFCode
      }; 
      list.push(found);
    }
  });

  return list;
}

exports.specialtyCreate = async (req, res) => {
  const specialty = new Specialty(req.body);

  try {
    await specialty.save();

    res.status(204).send();
  } catch (e) {
    res.status(500).json({
      message: "specialty 저장 실패",
    });
  }
};

exports.specialtyList = async (req, res) => {
  try {
    const specialtys = await Specialty.find({});

    res.status(200).send(specialtys);
  } catch (e) {
    res.status(500).json({
      message: "specialty 조회 실패",
    });
  }
};

exports.specialtyRead = async (req, res) => {
  const id = req.params.id;

  try {
    const specialty = await Specialty.findById(id);

    if (!specialty) {
      return res.status(404).send();
    }

    res.status(200).send(specialty);
  } catch (e) {
    res.status(500).json({
      message: "specialty 조회 실패",
    });
  }
};

exports.specialtyUpdate = async (req, res) => {
  const id = req.params.id;

  try {
    // new가 true이면 수정된 문서를 반환
    // runValidators가 true인 경우 업데이트 유효성 검사기를 실행
    const specialty = await Specialty.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!specialty) {
      return res.status(404).send();
    }

    res.status(200).send(specialty);
  } catch (e) {
    res.status(500).json({
      message: "specialty 변경 실패",
    });
  }
};

exports.specialtyDelete = async (req, res) => {
  const id = req.params.id;

  try {
    const specialty = await Specialty.findByIdAndDelete(id);

    if (!specialty) {
      return res.status(404).send();
    }

    res.status(200).send(specialty);
  } catch (e) {
    res.status(500).json({
      message: "specialty 삭제 실패",
    });
  }
};


exports.initSpecialty = async (req, res) => {
  try {
    await Specialty.deleteMany();
    await MainSpecialty.deleteMany();
    console.log('Specialty Data successfully deleted');


    fs.readFile(process.cwd() + "/src/assets/ms_meta.csv", 'utf8', (err, ms_meta_data) => {
      if (err) {
        return;
      }
      papa.parse(ms_meta_data, {
        header: true,
        transformHeader:function(h) {
          return h.trim();
        },
        complete: (results) => {
          const msDefs = results.data;
          fs.readFile(process.cwd() + "/src/assets/ss_meta.csv", 'utf8', (err, ss_meta_data) => {
            if (err) {
              return;
            }
            papa.parse(ss_meta_data, {
              header: true,
              transformHeader:function(h) {
                return h.trim();
              },
              complete: (results) => {
                const ssDefs = results.data;
                
                  getspecialtyDEFs(ssDefs, msDefs).forEach(i => {
                    const specialty = new Specialty(i);
                    specialty.save();
                  });

                  msDefs.forEach(i => {
                    const mainSpecialty = new MainSpecialty(i);
                    mainSpecialty.save();
                  });

                res.status(200).send();
              }
            });
          });
        }
      });
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: e,
    });
  }
};