const User = require("../../models/user");
const Chapter = require("../../models/chapter");
const Group = require("../../models/group");
const APSDef = require("../../models/apsdef");
const Specialty = require("../../models/specialty");
const papa = require('papaparse');
const fs = require('fs');

getChapterByChpaterCode = function (chapterCode, chapters) {
  return chapters.find((i) => i.chapterCode === chapterCode);
}

getGroupByGroupCode = function (groupCode, groups) {
  return groups.find((i) => i.groupCode === groupCode);
}

getAPSsByMemberId = function (id, aps_members, apsDefs) {
  const apsList = aps_members.filter((i) => i.memberID === id);
  if (apsList) {
    let result = [];
    apsList.forEach((i) => {
      let found = apsDefs.find((def) => def.apsID === i.APS_ID);
      if (found) result.push(found);
    });
    return result;
  }
  return undefined;
}

getSpecialtyByKseaId = function (KSEAId, specialty_members, ssDefs, msDefs) {
  const specialtyList = specialty_members.filter((i) => i.KSEAID === KSEAId);

  if (specialtyList) {
    let result = [];

    specialtyList.forEach((i) => {
      const ssFound = ssDefs.find((def) => def.SS_ID === i.SS_ID);
      if (ssFound) {
        const msFound = msDefs.find((def) => def.MainSpecialtyCode === ssFound.MainSpecialtyCode);
        if (msFound) {
          let found = {
            SS_ID: ssFound.SS_ID,
            SubSpecialtyCode: ssFound.SubSpecialtyCode,
            SubSpecialtyDesc: ssFound.SubSpecialtyDesc,
            MainSpecialtyCode: msFound.MainSpecialtyCode,
            MainSpecialtyDesc: msFound.MainSpecialtyDesc,
            NRFCode: ssFound.NRFCode
          };
          result.push(found);
        }
      }
    });
    return result;
  }
  return [];
}

exports.initUsers = async (req, res) => {
  try {
    //await user.save();
    await User.deleteMany();
    await Chapter.deleteMany();
    await Group.deleteMany();
    await APSDef.deleteMany();
    await Specialty.deleteMany();
    console.log('All Data successfully deleted');

    fs.readFile(process.cwd() + "/src/assets/member.csv", 'utf8', (err, m_data) => {
      if (err) {
        return;
      }
      papa.parse(m_data, {
        header: true,
        transformHeader:function(h) {
          return h.trim();
        },
        complete: (results) => {
          const users = results.data;
          fs.readFile(process.cwd() + "/src/assets/chapter_meta.csv", 'utf8', (err, cm_data) => {
            if (err) {
              return;
            }
            papa.parse(cm_data, {
              header: true,
              transformHeader:function(h) {
                return h.trim();
              },
              complete: (results) => {
                const chapters = results.data;
                chapters.forEach(c => {
                  const chapter = new Chapter(c);
                  chapter.save();
                });

                fs.readFile(process.cwd() + "/src/assets/tgroup_meta.csv", 'utf8', (err, gm_data) => {
                  if (err) {
                    return;
                  }
                  papa.parse(gm_data, {
                    header: true,
                    transformHeader:function(h) {
                      return h.trim();
                    },
                    complete: (results) => {
                      const groups = results.data;
                      groups.forEach(g => {
                        const group = new Group(g);
                        group.save();
                      });
                      fs.readFile(process.cwd() + "/src/assets/aps_meta.csv", 'utf8', (err, aps_data) => {
                        if (err) {
                          return;
                        }
                        papa.parse(aps_data, {
                          header: true,
                          transformHeader:function(h) {
                            return h.trim();
                          },
                          complete: (results) => {
                            const apsDefs = results.data;
                            apsDefs.forEach(a => {
                              const apsdef = new APSDef(a);
                              apsdef.save();
                            });
                            fs.readFile(process.cwd() + "/src/assets/aps_member.csv", 'utf8', (err, aps_member_data) => {
                              if (err) {
                                return;
                              }
                              papa.parse(aps_member_data, {
                                header: true,
                                transformHeader:function(h) {
                                  return h.trim();
                                },
                                complete: (results) => {
                                  const aps_members = results.data;
                                  fs.readFile(process.cwd() + "/src/assets/specialty_member.csv", 'utf8', (err, specialty_member_data) => {
                                    if (err) {
                                      return;
                                    }
                                    papa.parse(specialty_member_data, {
                                      header: true,
                                      transformHeader:function(h) {
                                        return h.trim();
                                      },
                                      complete: (results) => {
                                        const specialty_members = results.data;
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
                                                    users.forEach(u => {
                                                      if (u.chapterCode) {
                                                        u.chapter = getChapterByChpaterCode(u.chapterCode, chapters);
                                                      }
                                                      if (u.groupCode) u.group = getGroupByGroupCode(u.groupCode, groups);
                                                      u.apsList = getAPSsByMemberId(u.memberId, aps_members, apsDefs);
                                                      u.specialtyList = getSpecialtyByKseaId(u.KSEAId, specialty_members, ssDefs, msDefs);
                                                      if (u.dob) {
                                                        u.dob = u.dob.replace("00:00:00.000", "");
                                                        if (u.dob === 'NULL') u.dob = undefined;
                                                        if (u.dob) u.birth = new Date(u.dob);
                                                      }

                                                      if (u.registeredDate) {
                                                        u.registeredDate = u.registeredDate.replace("00:00:00.000", "");
                                                        if (u.registeredDate === 'NULL') u.registeredDate = undefined;
                                                        if (u.registeredDate) u.registeredDateFormatted = new Date(u.registeredDate);
                                                      }

                                                      if (u.lastUpdated) {
                                                        u.lastUpdated = u.lastUpdated.replace("00:00:00.000", "");
                                                        if (u.lastUpdated === 'NULL') u.lastUpdated = undefined;
                                                        if (u.lastUpdated) u.lastUpdatedFormatted = new Date(u.lastUpdated);
                                                      }

                                                      if (u.lastVisit) {
                                                        u.lastVisit = u.lastVisit.replace("00:00:00.000", "");
                                                        if (u.lastVisit === 'NULL') u.lastVisit = undefined;
                                                        if (u.lastVisit) u.lastVisitFormatted = new Date(u.lastVisit);
                                                      }

                                                      if (u.lastPaidDate) {
                                                        u.lastPaidDate = u.lastPaidDate.replace("00:00:00.000", "");
                                                        if (u.lastPaidDate === 'NULL') u.lastPaidDate = undefined;
                                                        if (u.lastPaidDate) u.lastPaidDateFormatted = new Date(u.lastPaidDate);
                                                      }

                                                      if (u.visitCount) {
                                                        if (u.visitCount === 'NULL') u.visitCount = undefined;
                                                        if (u.visitCount) u.visitCountFormatted = new Number(u.visitCount);
                                                      }

                                                      if (u.apsList) {
                                                        if (u.apsList.length > 0) u.aps1 = u.apsList[0];
                                                        if (u.apsList.length > 1) u.aps2 = u.apsList[1];
                                                        if (u.apsList.length > 2) u.aps3 = u.apsList[2];
                                                      }

                                                      if (u.specialtyList) {
                                                        if (u.specialtyList.length > 0) u.specialty1 = u.specialtyList[0];
                                                        if (u.specialtyList.length > 1) u.specialty2 = u.specialtyList[1];
                                                        if (u.specialtyList.length > 2) u.specialty3 = u.specialtyList[2];
                                                      }

                                                      const user = new User(u);
                                                      user.save();
                                                    });
                                                    res.status(200).send();
                                                  }
                                                });
                                              });
                                            }
                                          });
                                        });
                                      }
                                    });
                                  });
                                }
                              });
                            });
                          }
                        });
                      });
                    }
                  });
                });
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

exports.userCreate = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    res.status(204).send();
  } catch (e) {
    res.status(500).json({
      message: "User 저장 실패",
    });
  }
};

exports.userList = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).send(users);
  } catch (e) {
    res.status(500).json({
      message: "User 조회 실패",
    });
  }
};

exports.userRead = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send();
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(500).json({
      message: "User 조회 실패",
    });
  }
};

exports.userUpdate = async (req, res) => {
  const id = req.params.id;

  try {
    // new가 true이면 수정된 문서를 반환
    // runValidators가 true인 경우 업데이트 유효성 검사기를 실행
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send();
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(500).json({
      message: "User 변경 실패",
    });
  }
};

exports.userDelete = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).send();
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(500).json({
      message: "User 삭제 실패",
    });
  }
};