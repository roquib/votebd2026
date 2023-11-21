


--initially coppied
UPDATE `election_candidates` SET current_election_id=old_current_election_id, seat_id=old_seat_id, candidate_post=old_candidate_post_id WHERE 1

--Showing rows 850 - 874 (22189 total, Query took 0.3094 seconds.)
SELECT * FROM `election_candidates` ec
LEFT JOIN allseatPostMigration asp ON ec.old_current_election_id=asp.OldCurrentElectionID AND
ec.old_seat_id=asp.OldSeatID and
ec.old_candidate_post_id = asp.OldPostID


--5735 rows affected. (Query took 6.2834 seconds.)
UPDATE `election_candidates` ec
LEFT JOIN allseatPostMigration asp ON ec.old_current_election_id=asp.OldCurrentElectionID AND
ec.old_seat_id=asp.OldSeatID and
ec.old_candidate_post_id = asp.OldPostID
SET ec.current_election_id= IF(asp.NewCurrentElectionID, asp.NewCurrentElectionID, ec.old_current_election_id),
ec.seat_id=IF(asp.NewSeatID, asp.NewSeatID, ec.old_seat_id),
ec.candidate_post=IF(asp.NewPostID, asp.NewPostID, ec.old_candidate_post_id)

--note: city corporation election 2008 is not well organized, there is no constituency under any city corporation election under 2008


--adding divisionid and districtid to election_candidates
UPDATE election_candidates ec LEFT JOIN election_seat_list esl ON ec.seat_id=esl.id SET ec.division_id=esl.division_id, ec.district_code=esl.district_id


--adding current_election_id, seat_id, post_id, division_id, district_code
SELECT * FROM `person2profile` pp LEFT JOIN election_candidates ec ON pp.person_id=ec.person_id AND pp.old_current_election_id=ec.old_current_election_id AND pp.old_seat_id=ec.old_seat_id

UPDATE `person2profile` pp LEFT JOIN election_candidates ec ON pp.person_id=ec.person_id AND pp.old_current_election_id=ec.old_current_election_id AND pp.old_seat_id=ec.old_seat_id SET pp.current_election_id=ec.current_election_id, pp.seat_id=ec.seat_id, pp.post_id=ec.candidate_post, pp.division_id=ec.division_id, pp.district_code=ec.district_code

setting division_id and district_code from election_seat_list


--working with effidevit table
--copying old current election id, seat id, post id to new
UPDATE `effidevit` SET current_election_id=old_current_election_id, seat_id=old_seat_id, post_id=old_post_id
--set current election id, seat id, post_id, division id, district id from person2profile table
UPDATE `effidevit` e LEFT JOIN person2profile pp ON e.id=pp.profile_id SET e.`current_election_id`=pp.current_election_id, e.seat_id=pp.seat_id, e.post_id=pp.post_id, e.division_id=pp.division_id, e.district_code=pp.district_code



--working with profile_17a
--search join with person2profile
SELECT * FROM `profiles_17a` 17a LEFT JOIN person2profile pp ON 17a.`PROFILE_ID`=pp.profile_id AND pp.profile_type="MP_17A"

UPDATE `profiles_17a` a17 LEFT JOIN person2profile pp ON a17.`PROFILE_ID`=pp.profile_id AND pp.profile_type="MP_17A" SET a17.person_id=pp.person_id, a17.current_election_id=pp.current_election_id, a17.seat_id=pp.seat_id, a17.post_id=pp.post_id, a17.division_id=pp.division_id, a17.district_code=pp.district_code


--working with profile_17b
UPDATE `profiles_17b` a17 LEFT JOIN person2profile pp ON a17.`PROFILE_ID`=pp.profile_id AND pp.profile_type="MP_17B" SET a17.person_id=pp.person_id, a17.current_election_id=pp.current_election_id, a17.seat_id=pp.seat_id, a17.post_id=pp.post_id, a17.division_id=pp.division_id, a17.district_code=pp.district_code


--working with profile_17c
SELECT * FROM `profiles_17c` a17 , person2profile pp WHERE a17.`PROFILE_ID`=pp.profile_id AND pp.profile_type="MP_INCOMETAX_NEW"


SELECT * FROM `profiles_17c` a17 , person2profile pp WHERE a17.`PROFILE_ID`=pp.profile_id AND (pp.profile_type="MP_INCOMETAX_NEW" OR pp.profile_type="MP_INCOMETAX")


UPDATE `profiles_17c` a17 LEFT JOIN person2profile pp ON a17.`PROFILE_ID`=pp.profile_id AND (pp.profile_type="MP_INCOMETAX_NEW" OR pp.profile_type="MP_INCOMETAX") SET a17.person_id=pp.person_id, a17.current_election_id=pp.current_election_id, a17.seat_id=pp.seat_id, a17.post_id=pp.post_id, a17.division_id=pp.division_id, a17.district_code=pp.district_code

UPDATE `profiles_17c` p LEFT JOIN election_seat_list esl ON p.seat_id=esl.id SET p.current_election_id=esl.current_election_id



--working with profiles_17c2
SELECT * FROM `profiles_17c2` pc2, profiles_17c pc1 WHERE pc2.PROFILE_ID=pc1.PROFILE_ID

UPDATE  `profiles_17c2` pc2 LEFT JOIN profiles_17c pc1 ON pc2.PROFILE_ID=pc1.PROFILE_ID SET pc2.`current_election_id`=pc1.current_election_id, pc2.`post_id`=pc1.post_id, pc2.`seat_id`=pc1.seat_id, pc2.`person_id`=pc1.person_id, pc2.`division_id`=pc1.division_id, pc2.`district_code`=pc1.district_code

--working with profile_17c3
UPDATE `profiles_17c3` pc2 LEFT JOIN profiles_17c pc1 ON pc2.PROFILE_ID=pc1.PROFILE_ID SET pc2.`current_election_id`=pc1.current_election_id, pc2.`post_id`=pc1.post_id, pc2.`seat_id`=pc1.seat_id, pc2.`person_id`=pc1.person_id, pc2.`division_id`=pc1.division_id, pc2.`district_code`=pc1.district_code

--working with profiles_it10b
UPDATE `profiles_it10b` pc2 LEFT JOIN profiles_17c pc1 ON pc2.PROFILE_ID=pc1.PROFILE_ID SET pc2.`current_election_id`=pc1.current_election_id, pc2.`post_id`=pc1.post_id, pc2.`seat_id`=pc1.seat_id, pc2.`person_id`=pc1.person_id, pc2.`division_id`=pc1.division_id, pc2.`district_code`=pc1.district_code


--working with profiles_it10bb
UPDATE `profiles_it10bb` pc2 LEFT JOIN profiles_17c pc1 ON pc2.PROFILE_ID=pc1.PROFILE_ID SET pc2.`current_election_id`=pc1.current_election_id, pc2.`post_id`=pc1.post_id, pc2.`seat_id`=pc1.seat_id, pc2.`person_id`=pc1.person_id, pc2.`division_id`=pc1.division_id, pc2.`district_code`=pc1.district_code


--working with constitutionalPost
SELECT * FROM election_candidates ec LEFT JOIN constitutional_posts cp ON ec.`constitutional_post`=cp.nameBn
UPDATE election_candidates ec LEFT JOIN constitutional_posts cp ON ec.`constitutional_post`=cp.nameBn SET ec.constitutional_post_id=cp.id


--working with candiate, adding person name form persons table
UPDATE `election_candidates` ec LEFT JOIN persons p ON ec.`person_id`=p.id SET ec.`personNameEn`=p.person_name_eng, ec.`personNameBn`=p.person_name_bng


--working with effidavit
SELECT * FROM `effidevit` e, election_candidates ec WHERE e.`current_election_id`=ec.current_election_id AND e.`seat_id`=ec.seat_id AND e.`post_id`=ec.candidate_post AND e.`person_id`=ec.person_id

UPDATE `effidevit` e LEFT JOIN election_candidates ec ON e.`current_election_id`=ec.current_election_id AND e.`seat_id`=ec.seat_id AND e.`post_id`=ec.candidate_post AND e.`person_id`=ec.person_id SET e.candidate_id=ec.id

UPDATE effidevit e LEFT JOIN person2profile pp ON e.id=pp.profile_id AND pp.profile_type="EFFIDEVIT" SET e.publish=pp.publish

--working with effidevit_court_section
UPDATE `effidevit_court_section` ec LEFT JOIN effidevit e ON ec.`profile_id`= e.id AND e.publish="publish" SET ec.publish=e.publish

--working with effidevit_income_section
UPDATE `effidevit_income_section` ec LEFT JOIN effidevit e ON ec.`profile_id`= e.id AND e.publish="publish" SET ec.publish=e.publish


--working with effidevit_loans_section
UPDATE `effidevit_loans_section` ec LEFT JOIN effidevit e ON ec.`profile_id`= e.id AND e.publish="publish" SET ec.publish=e.publish


--working with effidevit_liabilities_section
UPDATE `effidevit_liabilities_section` ec LEFT JOIN effidevit e ON ec.`profile_id`= e.id AND e.publish="publish" SET ec.publish=e.publish



--working with profiles_17a
SELECT `profiles_17a` e, election_candidates ec WHERE e.`current_election_id`=ec.current_election_id AND e.`seat_id`=ec.seat_id AND e.`post_id`=ec.candidate_post AND e.`person_id`=ec.person_id

UPDATE `profiles_17a` e LEFT JOIN election_candidates ec ON e.`current_election_id`=ec.current_election_id AND e.`seat_id`=ec.seat_id AND e.`post_id`=ec.candidate_post AND e.`person_id`=ec.person_id SET e.candidate_id=ec.id

UPDATE `profiles_17a` p LEFT JOIN person2profile pp ON p.`PROFILE_ID`=pp.profile_id AND pp.profile_type="MP_17A"  SET p.publish=pp.publish

--working with profiles_17b
UPDATE `profiles_17b` e LEFT JOIN election_candidates ec ON e.`current_election_id`=ec.current_election_id AND e.`seat_id`=ec.seat_id AND e.`post_id`=ec.candidate_post AND e.`person_id`=ec.person_id SET e.candidate_id=ec.id

UPDATE profiles_17b e LEFT JOIN person2profile pp ON e.`PROFILE_ID`=pp.profile_id AND pp.profile_type="MP_17B" SET e.publish=pp.publish

--working with profiles_17c
UPDATE `profiles_17c` e LEFT JOIN election_candidates ec ON e.`current_election_id`=ec.current_election_id AND e.`seat_id`=ec.seat_id AND e.`post_id`=ec.candidate_post AND e.`person_id`=ec.person_id SET e.candidate_id=ec.id

UPDATE profiles_17c e LEFT JOIN person2profile pp ON e.`PROFILE_ID`=pp.profile_id AND (pp.profile_type="MP_INCOMETAX_NEW" OR pp.profile_type="MP_INCOMETAX")  SET e.publish=pp.publish




-----------------------------------------------------------------------------------------------------------------------------------------
--
--UPDATE `election_candidates` ec, allseatPostMigration sp SET ec.current_election_id=sp.NewCurrentElectionID, ec.seat_id=sp.NewSeatID , ec.candidate_post=sp.NewPostID WHERE ec.`old_current_election_id`= sp.OldCurrentElectionID AND ec.`old_seat_id`=sp.OldSeatID AND ec.`old_candidate_post_id`=sp.OldPostID
--
--UPDATE `person2profile` pp, election_candidates sp SET pp.current_election_id=sp.current_election_id, pp.seat_id=sp.seat_id , pp.candidate_post=sp.candidate_post WHERE pp.`old_current_election_id`= sp.old_current_election_id AND pp.`old_seat_id`=sp.old_seat_id AND pp. person_id=sp.person_id
--
--
--
--UPDATE `profiles_17a` p, person2profile pp SET p.person_id=pp.person_id, p.current_election_id=pp.current_election_id, p.seat_id=pp.seat_id, p.post_id=pp.candidate_post WHERE p.`INFO_ID`=pp.profile_id AND pp.profile_type="MP_17A"
--
--
--SELECT * FROM `profiles_17a` p LEFT JOIN person2profile pp ON p.`PROFILE_ID`=pp.profile_id AND pp.profile_type="MP_17A"
