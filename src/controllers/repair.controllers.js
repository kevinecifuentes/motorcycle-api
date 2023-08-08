const Repair = require('../models/repair.model')

// find all pending repairs
exports.findAllRepairs = async (req, res) => {
  try {
    const repairs = await Repair.findAll({
      where: {
        status: 'pending',
      },
    })

    res.status(200).json({
      status: 'succes',
      message: 'users founds',
      repairs,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 'fail',
      message: 'something went wrong!',
      error,
    })
  }
}

//find repair with id
exports.findRepair = async (req, res) => {
  try {
    const { repair } = req
    const { id } = req.params

    return res.status(200).json({
      status: 'succes',
      message: `repair with id ${id} found`,
      repair,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 'fail',
      message: 'something went wrong!',
      error,
    })
  }
}

//create repair
exports.createRepair = async (req, res) => {
  try {
    const { date, userId, motorsNumber, description } = req.body

    const repair = await Repair.create({
      date,
      userId,
      motorsNumber,
      description,
    })

    return res.status(200).json({
      status: 'succes',
      message: 'new repair created',
      repair,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 'fail',
      message: 'something went wrong!',
      error,
    })
  }
}

//update repair
exports.updateRepair = async (req, res) => {
  try {
    const { repair } = req

    if (repair.status === 'cancelled') {
      return res.status(400).json({
        status: 'invalid',
        message: 'status cancelled cannot be updated to completed',
      })
    }

    if (repair.status === 'completed') {
      return res.status(400).json({
        status: 'invalid',
        message:
          'A repair with status completed connot be changed to the same value',
      })
    }

    await repair.update({ status: 'completed' })

    return res.status(200).json({
      status: 'succes',
      message: 'status has been changed to completed',
      repair,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 'fail',
      message: 'something went wrong!',
    })
  }
}

//delete repair
exports.deleteRepair = async (req, res) => {
  try {
    const { repair } = req

    if (repair.status === 'completed') {
      return res.status(400).json({
        status: 'error',
        message: 'repair with status completed cannot be deleted',
      })
    }
    await repair.update({ status: 'cancelled' })

    res.status(200).json({
      status: 'succes',
      message: 'repair deleted',
      repair,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 'fail',
      message: 'something went wrong',
      error,
    })
  }
}
