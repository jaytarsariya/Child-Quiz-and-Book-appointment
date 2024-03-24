import { Op } from 'sequelize';
import {
  CanceledDTO,
  bookAppointmentDTO,
  createStaffDTO,
  createStaffDTO1,
} from '../../dto/Staffdto';
import { UserStaff } from '../../models/staffUser';
import { SiftStaff } from '../../models/siftStaff';
import { myStaff } from '../../models/mystaff';
import { sUser } from '../../models/Suser';
import NodeCache from 'node-cache';

const nodeCache = new NodeCache();

export class StaffService {
  async CreateStaff(data: createStaffDTO1): Promise<any> {
    const newdata = await data.sift.map((staffsift: any) => {
      return {
        day: staffsift.day,
        startTime: staffsift.startTime,
        endTime: staffsift.endTime,
      };
    });

    const existingStaff = await myStaff.findOne({ where: { name: data.name } });
    if (!existingStaff) {
      const newcreate = await myStaff.create(
        {
          name: data.name,
          sift: newdata,
        },
        { include: [{ model: SiftStaff, as: 'sift' }] }
      );
      return newcreate;
    } else {
      return null;
    }
  }

  async Showstaff(): Promise<any> {
    // const cachedData = nodeCache.get("mydata");
    // if (typeof cachedData === 'string') {
    //     return JSON.parse(cachedData);
    // }
    const viewdata = await myStaff.findAll({
      include: [SiftStaff],
    });

    // nodeCache.set("mydata", JSON.stringify(viewdata),60);
    return viewdata;
  }

  async BookAppointment(data: bookAppointmentDTO): Promise<any> {
    const current = new Date();
    const userenterdate = new Date(data.date);
    const usersatart = new Date(`${data.date}T${data.ustartTime}`);
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const day = userenterdate.getDay();
    const myday = daysOfWeek[day];

    if (myday == 'Sunday') {
      return 'sunday';
    }

    if (current > usersatart) {
      return 'timenot';
    } else {
      const availableStaff = await myStaff.findAll({
        include: [
          {
            model: SiftStaff,
            where: {
              day: { [Op.eq]: myday },
              startTime: { [Op.lte]: data.ustartTime },
              endTime: { [Op.gte]: data.uendTime },
            },
          },
        ],
      });
      if (availableStaff.length > 0) {
        const mystaffmap = availableStaff.map((staff) => staff.id);

        for (const staffId of mystaffmap) {
          const isAlreadyBooked = await UserStaff.findOne({
            where: {
              date: data.date,
              ustartTime: data.ustartTime,
              uendTime: data.uendTime,
              staffid: staffId,
            },
          });
          if (!isAlreadyBooked) {
            const finduser = await sUser.findOne({
              where: {
                name: data.name,
                phone: data.phone,
              },
            });

            if (finduser) {
              const newAppointment = await UserStaff.create({
                date: data.date,
                ustartTime: data.ustartTime,
                uendTime: data.uendTime,
                userid: finduser.id,
                staffid: staffId,
                day: myday,
              });

              const message = {
                message: `Appointment booked for ${newAppointment.date} On ${newAppointment.day} at ${newAppointment.ustartTime} to ${newAppointment.uendTime} with staff_${staffId} Existing User...`,
              };

              return message;
            } else {
              //  ................... New User ........................

              let UserCreated = await sUser.create({
                name: data.name,
                phone: data.phone,
              });

              const newAppointment = await UserStaff.create({
                date: data.date,
                ustartTime: data.ustartTime,
                uendTime: data.uendTime,
                userid: UserCreated.id,
                staffid: staffId,
                day: myday,
              });

              const message = {
                Success: true,
                Date: newAppointment.date,
                StartTime: newAppointment.ustartTime,
                EndTime: newAppointment.uendTime,
                staff: newAppointment.staffid,
                Day: newAppointment.day,
              };

              return message;
            }
          } else {
            if (isAlreadyBooked.isCanceled === true) {
              const checkuser = await sUser.findOne({
                where: {
                  name: data.name,
                  phone: data.phone,
                },
              });

              if (checkuser) {
                await UserStaff.update(
                  { userid: checkuser.id, isCanceled: false },
                  { where: { id: isAlreadyBooked.id } }
                );
                const message = {
                  message: `Appointment booked for ${isAlreadyBooked.date} at ${isAlreadyBooked.ustartTime} to ${isAlreadyBooked.uendTime} with staff_${staffId} updateded data..existing...;`,
                };
                return message;
              } else {
                const createnew = await sUser.create({
                  name: data.name,
                  phone: data.phone,
                });

                await UserStaff.update(
                  { userid: createnew.id, isCanceled: false },
                  { where: { id: isAlreadyBooked.id } }
                );

                const message = {
                  message: `Appointment booked for ${isAlreadyBooked.date} at ${isAlreadyBooked.ustartTime} to ${isAlreadyBooked.uendTime} with staff_${staffId} new user .....cancel ap. book`,
                };
                return message;
              }
            }
          }
        }
      } else {
        return 'notAvailable';
      }
    }
  }

  async Fetchbookedstaff(id: number): Promise<any> {
    const cachedData = nodeCache.get('bookedData');

    if (typeof cachedData === 'string') {
      return JSON.parse(cachedData);
    }
    const check = await UserStaff.findAll();

    nodeCache.set('bookedData', JSON.stringify(check)); // 1 min

    return check;
  }

  async updatemystaff(
    id: number,
    day: string,
    startTime: string,
    endTime: string
  ): Promise<any> {
    const mydate = new Date('2024-02-16');
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const currentdate = new Date();
    const newday = currentdate.getDay();
    const myday = daysOfWeek[newday];
    const CurrentformattedDate = currentdate.toISOString().split('T')[0];

    try {
      const checkpast = (
        await UserStaff.findAll({
          where: {
            staffid: id,
            date: CurrentformattedDate,
            day: day,
            uendTime: { [Op.lte]: startTime },
          },
        })
      ).map((record) => ({
        date: record.date,
        uendTime: record.uendTime,
      }));

      for (const pastRecord of checkpast) {
        const updateTimeIntoDate = new Date(`${pastRecord.date}T${startTime}`);
        const currentTime = new Date();

        if (currentTime > updateTimeIntoDate) {
          const checkEndUser = (
            await UserStaff.findAll({
              where: {
                staffid: id,
                date: CurrentformattedDate,
                day: day,
                uendTime: { [Op.gte]: endTime },
              },
            })
          ).map((record) => ({
            date: record.date,
            uendTime: record.uendTime,
            isCanceled: record.isCanceled,
          }));

          for (const endUserRecord of checkEndUser) {
            if (endUserRecord.isCanceled === false) {
              return 'userendtimeerror';
            }
          }

          const findData = await SiftStaff.findOne({
            where: { mystaffid: id, day: day },
          });
          if (!findData) {
            return 'notfound';
          }
          await SiftStaff.update(
            { startTime, endTime },
            { where: { mystaffid: id, day: findData?.day } }
          );
          nodeCache.del('mydata');
          return {
            Message: true,
            data: 'Updated',
          };
        }
      }

      const checkEndUser = (
        await UserStaff.findAll({
          where: {
            staffid: id,
            date: CurrentformattedDate,
            day: day,
            uendTime: { [Op.gte]: endTime },
          },
        })
      ).map((record) => ({
        date: record.date,
        uendTime: record.uendTime,
        isCanceled: record.isCanceled,
      }));

      for (const endUserRecord of checkEndUser) {
        if (endUserRecord.isCanceled === false) {
          return 'userendtimeerror';
        }
      }

      const findData = await SiftStaff.findOne({
        where: { mystaffid: id, day: day },
      });
      if (!findData) {
        return 'notfound';
      }
      const newTime = await SiftStaff.update(
        { startTime, endTime },
        { where: { mystaffid: id, day: findData?.day } }
      );
      return newTime;
    } catch (error) {
      console.error('Error:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  async findstaffById(id: number): Promise<any> {
    const data = await myStaff.findOne({
      where: { id: id },
      include: [
        {
          model: SiftStaff,
        },
      ],
    });
    if (!data) {
      return 'Data not found';
    }
    return data;
  }

  async getByCondition(
    day: string,
    starttime: string,
    endTime: string
  ): Promise<any> {
    const data = await SiftStaff.findAll({
      where: {
        day: day,
        startTime: { [Op.lte]: starttime },
        endTime: { [Op.gte]: endTime },
      },
    });
    return data;
  }

  async Pagination(page: number, perpage: number): Promise<any> {
    const offset = (page - 1) * perpage;
    const limit = perpage;
    const paginationData = await SiftStaff.findAndCountAll({
      offset,
      limit,
    });

    return {
      Total: paginationData.count,
      data: paginationData.rows,
      page,
    };
  }

  async deletestaff(id: number): Promise<any> {
    const currentdate = new Date();

    const data = await UserStaff.findAll({
      where: {
        date: currentdate,
        staffid: id,
      },
    });
    if (data.length > 0) {
      return 'notdelete';
    } else {
      return 'delete';
    }
  }

  async FindWithDate(date: Date): Promise<any> {
    if (!date) {
      return 'noresponse';
    }
    const data = await UserStaff.findAll({
      where: { date },
    });
    if (!data) {
      return 'notDate';
    }
    return data;
  }

  async findWithUserTimeAndDate(
    date: Date,
    ustartTime: string,
    uendTime: string
  ): Promise<any> {
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const userdate = new Date(date);
    const myday = userdate.getDay();
    const day = daysOfWeek[myday];

    const data = await UserStaff.findAll({
      where: {
        day: day,
        ustartTime: { [Op.lte]: ustartTime },
        uendTime: { [Op.gte]: uendTime },
      },
    });

    if (!data) {
      return 'notDate';
    }
    return data;
  }

  async findUserWithStaff(id: number): Promise<any> {
    try {
      const data = await UserStaff.findAll({
        where: {
          staffid: id,
        },
      });
      if (!data) {
        return 'notfound';
      }

      const finduser = await sUser.findOne({
        where: {
          id: id,
        },
      });

      const UserDetails = {
        UserName: finduser?.name,
        PhoneNo: finduser?.phone,
      };
      const booked = data.map((hello: any) => {
        return hello;
      });
      return { UserDetails, booked };
    } catch (error) {
      console.log(error, 'error');
    }
  }

  async findWithId(id: number): Promise<any> {
    const data = await UserStaff.findOne({ where: { id: id } });
    if (!data) {
      return 'notfound';
    }
    return data;
  }

  //  ________________________________ User side _________________________

  async HowManyTimeBook(phone: number): Promise<any> {
    const data = await sUser.findOne({
      where: {
        phone: phone,
      },
    });
    if (!data) {
      return 'notfound';
    }
    const findappointment = await UserStaff.findAndCountAll({
      where: {
        userid: data.id,
      },
    });
    const amppingdata = await findappointment.rows.map((hello: any) => {
      return { // FIND APPOINTMENT AND GO WITH THIS CODE AND GROW THIS CODE HOW MANY DAY TO CELEBRATE
        date: hello.date,
        startTime: hello.ustartTime,
        endTime: hello.uendTime,
      };
    });
    return {
      Total: `${findappointment.count} Time Booked`,
      data: amppingdata,
    };
  }

  async cancelAppointment(data: CanceledDTO): Promise<any> {
    const checkPhone = await sUser.findOne({
      where: {
        phone: data.phone,
      },
    });
    if (!checkPhone) {
      return 'notfound';
    }

    const findalreadycancel = await UserStaff.findOne({
      where: {
        date: data.date,
        userid: checkPhone.id,
        isCanceled: true,
      },
    });

    if (findalreadycancel) {
      return 'alreadycancel';
    }

    const checkDate = await UserStaff.findOne({
      where: {
        userid: checkPhone.id,
        date: data.date,
      },
    });

    if (!checkDate) {
      return 'appointmentnotfound';
    }

    const currentdateTime = new Date();
    const appointmenttime = new Date(
      checkDate.date + 'T' + checkDate.ustartTime
    );
    const differenceInMilliseconds =
      appointmenttime.getTime() - currentdateTime.getTime();
    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
    const mycheckedtime = differenceInHours.toFixed(0);

    if (parseInt(mycheckedtime) >= 2) {
      await UserStaff.update(
        { isCanceled: true },
        { where: { id: checkDate.id } }
      );
      return {
        message: 'Appointment canceled successfully',
      };
    } else {
      return 'notbooked';
    }
  }

  async SearchAvailableTime(date: Date): Promise<any> {
    const availableSlots: { time: string; staffid: number }[] = [];

    let booked = 0;
    let unbooked = 0;
    //  Find the day of the week for the entered date
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const userDate = new Date(date);
    const userDay = daysOfWeek[userDate.getDay()];

    const findAllstaff = await SiftStaff.findAll({
      where: {
        day: userDay,
      },
    });

    for (const newstaff of findAllstaff) {
      // staff start time or end time ...
      let staffstartTime = newstaff.startTime; // staff start time
      const StartTimefirstTwoDigit = staffstartTime.substring(0, 2); // convert in two number
      const startasNumber = parseInt(StartTimefirstTwoDigit); // convert in number
      let staffendtime = newstaff.endTime;
      const EndTimefirstTwoDigit = staffendtime.substring(0, 2);
      const endNumber = parseInt(EndTimefirstTwoDigit);

      const increasedNumber = startasNumber + 1;

      for (let i = increasedNumber; i <= endNumber; i++) {
        const endtimeConvertintoTime = (i + ':00').toString();

        const findUser = await UserStaff.findOne({
          where: {
            staffid: newstaff.mystaffid,
            uendTime: endtimeConvertintoTime,
            date: date,
          },
        });
        if (findUser) {
          booked++;
        } else {
          const mystartTime = parseInt(endtimeConvertintoTime) - 1;
          const convertstart = mystartTime + ':00';
          const currentTime = new Date();
          const mytimeanddate = new Date(`${date}T${convertstart}`);

          if (currentTime < mytimeanddate) {
            let slot = {
              time: `${convertstart} To ${endtimeConvertintoTime}`,
              staffid: newstaff.mystaffid,
            };
            availableSlots.push(slot);
          } else {
            unbooked++; //
          }
        }
      }
    }
    if (availableSlots.length === 0) {
      return 'full';
    }
    return availableSlots;
  }

  async DeleteExpiredAppointment(): Promise<any> {
    const currentDate = new Date();
    const bookdata = await UserStaff.findAll({
      where: { date: { [Op.lt]: currentDate } },
    });
    return bookdata;
  }
}
