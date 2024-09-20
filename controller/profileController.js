import { validationResult } from "express-validator";
import { Profile } from "../models/Profile.js";
import normalizeUrl from "normalize-url";
import { User } from "../models/User.js";
import { Posts } from "../models/Post.js";
import request from "request";

export const getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json( profile );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

export const createAndUpdateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // destructure the request
  const {
    website,
    skills,
    youtube,
    twitter,
    instagram,
    linkedin,
    facebook,
    // spread the rest of the fields we don't need to check
    ...rest
  } = req.body;

  //   see the below code explanation in CHAt gpt intermediate mern project
  // build a profile
  const profileFields = {
    user: req.user.id,
    website:
      website && website !== ""
        ? normalizeUrl(website, { forceHttps: true })
        : "",
    skills: Array.isArray(skills)
      ? skills
      : skills.split(",").map((skill) => " " + skill.trim()),
    ...rest,
  };

  // Build socialFields object
  const socialFields = { youtube, twitter, instagram, linkedin, facebook };

  // normalize social fields to ensure valid url
  for (const [key, value] of Object.entries(socialFields)) {
    if (value && value.length > 0)
      socialFields[key] = normalizeUrl(value, { forceHttps: true });
  }
  // add to profileFields
  profileFields.social = socialFields;

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      // Update the profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );

      return res.json({ profile });
    }

    // create the profile
    profile = new Profile(profileFields);

    await profile.save();

    res.json({ profile });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", [
      "name",
      "avatar",
    ]); // populate is used to include the given fields from user model

    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

export const getProfileByUserId = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]); // populate is used to include the given fields from user model
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);

    // check for a particular kind of an error
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server error");
  }
};

export const deleteProfile = async (req, res) => {
  try {
    // Remove user posts
    await Posts.deleteMany({ user: req.user.id })

    // Remove profile
    await Profile.findOneAndDelete({ user: req.user.id });

    // Remove user
    await User.findOneAndDelete({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

export const addExperience = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, company, location, from, to, current, description } = req.body;

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(newExp);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

export const deleteExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // Get remove index
    const removeIndex = profile.experience
      .map((exp) => exp.id)
      .indexOf(req.params.exp_id);

    // removing the item
    profile.experience.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

export const addEducation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { school, degree, fieldofstudy, from, to, current, description } =
    req.body;

  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.education.unshift(newEdu);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

export const deleteEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // Get remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    // removing the item
    profile.education.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};


export const getGitHub = async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&cliend_id=${process.env.GITHUB_CLIENT_ID_APP}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    };

    request(options, (error, response, body) => {
        if(error) console.error(error);

        if(response.statusCode !== 200){
            return res.status(404).json({ msg: "No Github profile found" })
        }

        res.json(JSON.parse(body))
        
    })
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
